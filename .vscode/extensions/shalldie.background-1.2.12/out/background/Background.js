"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
// sys
const fs_1 = __importDefault(require("fs"));
// libs
const vscode_1 = __importDefault(require("vscode"));
// self
const vsHelp_1 = require("../utils/vsHelp");
const constants_1 = require("../constants");
const CssGenerator_1 = require("./CssGenerator");
const utils_1 = require("../utils");
const CssFile_1 = require("./CssFile");
const vscodePath_1 = require("../utils/vscodePath");
/**
 * 插件逻辑类
 *
 * @export
 * @class Background
 */
class Background {
    constructor() {
        // #region fields 字段
        /**
         * css文件操作对象
         *
         * @memberof Background
         */
        this.cssFile = new CssFile_1.CssFile(vscodePath_1.vscodePath.cssPath); // 没必要继承，组合就行
        /**
         * 当前用户配置
         *
         * @private
         * @type {TConfigType}
         * @memberof Background
         */
        this.config = vscode_1.default.workspace.getConfiguration('background');
        /**
         * 需要释放的资源
         *
         * @private
         * @type {Disposable[]}
         * @memberof Background
         */
        this.disposables = [];
        // #endregion
    }
    // #endregion
    // #region private methods 私有方法
    /**
     * 检测是否初次加载，并在初次加载的时候提示用户
     *
     * @private
     * @returns {boolean} 是否初次加载
     * @memberof Background
     */
    checkFirstload() {
        return __awaiter(this, void 0, void 0, function* () {
            const firstLoad = !fs_1.default.existsSync(constants_1.TOUCH_FILE_PATH);
            if (firstLoad) {
                // 提示
                vscode_1.default.commands.executeCommand('extension.background.info');
                // 标识插件已启动过
                yield fs_1.default.promises.writeFile(constants_1.TOUCH_FILE_PATH, vscodePath_1.vscodePath.cssPath, constants_1.ENCODING);
                return true;
            }
            return false;
        });
    }
    /**
     * 安装插件，hack css
     *
     * @private
     * @param {boolean} [refresh=false] 需要强制更新
     * @returns {void}
     * @memberof Background
     */
    install(refresh = false) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const lastConfig = this.config; // 之前的配置
            const config = Object.assign({}, vscode_1.default.workspace.getConfiguration('background')); // 当前用户配置
            // 1.如果配置文件改变的时候，当前插件配置没有改变，则返回
            if (!refresh && JSON.stringify(lastConfig) == JSON.stringify(config)) {
                // console.log('配置文件未改变.')
                return;
            }
            // 之后操作有两种：1.初次加载  2.配置文件改变
            // 2.两次配置均为，未启动插件
            if (!lastConfig.enabled && !config.enabled) {
                // console.log('两次配置均为，未启动插件');
                return;
            }
            // 3.保存当前配置
            this.config = config; // 更新配置
            // 处理 useDefault 默认值, 如果用户没有配置图片则开启它
            if (config.useDefault === null) {
                config.useDefault = !(config.customImages.length ||
                    ((_b = (_a = config.fullscreen) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.length) ||
                    ((_d = (_c = config.fullscreen) === null || _c === void 0 ? void 0 : _c.images) === null || _d === void 0 ? void 0 : _d.length));
            }
            // 4.如果关闭插件
            if (!config.enabled) {
                yield this.uninstall();
                vsHelp_1.vsHelp.showInfoRestart('Background has been uninstalled! Please restart.');
                return;
            }
            // 5.应用配置到css文件
            try {
                // 该动作需要加锁，涉及多次文件读写
                yield utils_1.utils.lock();
                const content = (yield CssGenerator_1.CssGenerator.create(config)).trimEnd(); // 去除末尾空白
                // 添加到原有样式(尝试删除旧样式)中
                let cssContent = yield this.cssFile.getContent();
                cssContent = this.cssFile.clearContent(cssContent);
                // 异常case return
                if (!cssContent.trim().length) {
                    return;
                }
                cssContent += content;
                if (yield this.cssFile.saveContent(cssContent)) {
                    vsHelp_1.vsHelp.showInfoRestart('Background has been changed! Please restart.');
                }
            }
            finally {
                yield utils_1.utils.unlock();
            }
        });
    }
    // #endregion
    // #region public methods
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof Background
     */
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const firstload = yield this.checkFirstload(); // 是否初次加载插件
            const editType = yield this.cssFile.getEditType(); // css 文件目前状态
            // 如果是第一次加载插件，或者旧版本
            if (firstload || editType == CssFile_1.ECSSEditType.IsOld || editType == CssFile_1.ECSSEditType.NoModified) {
                yield this.install(true);
            }
            // 监听文件改变
            this.disposables.push(vscode_1.default.workspace.onDidChangeConfiguration(() => __awaiter(this, void 0, void 0, function* () {
                // 0~500ms 的延时，对于可能的多实例，错开对于文件的操作
                // 虽然有锁了，但这样更安心 =。=
                yield utils_1.utils.sleep(~~(Math.random() * 500));
                this.install();
            })));
        });
    }
    /**
     * 是否已安装
     *
     * @return {*}
     * @memberof Background
     */
    hasInstalled() {
        return this.cssFile.hasInstalled();
    }
    /**
     * 卸载
     *
     * @return {*}  {Promise<boolean>} 是否成功卸载
     * @memberof Background
     */
    uninstall() {
        return this.cssFile.uninstall();
    }
    /**
     * 释放资源
     *
     * @memberof Background
     */
    dispose() {
        this.disposables.forEach(n => n.dispose());
    }
}
exports.Background = Background;
//# sourceMappingURL=Background.js.map