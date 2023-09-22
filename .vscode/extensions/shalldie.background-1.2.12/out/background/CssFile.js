"use strict";
/**
 * 负责css文件的相关操作
 * 需要考虑无 vscode api 的情况
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CssFile = exports.ECSSEditType = void 0;
// sys
const os_1 = require("os");
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
// self
const vsc_1 = require("../utils/vsc");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
/**
 * css文件修改状态类型
 *
 * @export
 * @enum {number}
 */
var ECSSEditType;
(function (ECSSEditType) {
    /**
     * 未修改的css文件
     */
    ECSSEditType[ECSSEditType["NoModified"] = 0] = "NoModified";
    /**
     * hack 过的旧版本css文件
     */
    ECSSEditType[ECSSEditType["IsOld"] = 1] = "IsOld";
    /**
     * hack 过的新版本的css文件
     */
    ECSSEditType[ECSSEditType["IsNew"] = 2] = "IsNew";
})(ECSSEditType = exports.ECSSEditType || (exports.ECSSEditType = {}));
/**
 * css 文件相关操作
 *
 * @export
 * @class CssFile
 */
class CssFile {
    constructor(
    /**
     * 文件路径
     */
    filePath) {
        this.filePath = filePath;
    }
    /**
     * 获取当前 css 文件的修改类型
     *
     * @return {*}  {Promise<ECSSEditType>}
     * @memberof CssFile
     */
    getEditType() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.hasInstalled())) {
                return ECSSEditType.NoModified;
            }
            const cssContent = yield this.getContent();
            // hack 过的旧版本，即不包含当前版本
            const ifVerOld = !~cssContent.indexOf(`/*${constants_1.BACKGROUND_VER}.${constants_1.VERSION}*/`);
            if (ifVerOld) {
                return ECSSEditType.IsOld;
            }
            // hack 过的新版本
            return ECSSEditType.IsNew;
        });
    }
    /**
     * 获取 css 文件内容
     *
     * @return {*}  {Promise<string>}
     * @memberof CssFile
     */
    getContent() {
        return fs_1.default.promises.readFile(this.filePath, constants_1.ENCODING);
    }
    /**
     * 设置 css 文件内容
     *
     * @param {string} content
     * @return {*}  {Promise<boolean>}
     * @memberof CssFile
     */
    saveContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content || !content.length) {
                return false;
            }
            try {
                yield fs_1.default.promises.access(this.filePath, fs_1.constants.W_OK);
                yield fs_1.default.promises.writeFile(this.filePath, content, constants_1.ENCODING);
                return true;
            }
            catch (e) {
                if (!vsc_1.vscode) {
                    return false;
                }
                // FIXME：
                // 一些系统会报错：Unable to find pkexec or kdesudo.
                // 相关 issue：https://github.com/jorangreef/sudo-prompt/pull/123
                // 测试环境： codercom/code-server:4.4.0
                // uname -a
                // Linux code-server-b6cc684df-sqx9h 5.4.0-77-generic #86-Ubuntu SMP Thu Jun 17 02:35:03 UTC 2021 x86_64 GNU/Linux
                const retry = 'Retry with Admin/Sudo';
                const result = yield vsc_1.vscode.window.showErrorMessage(e.message, retry);
                if (result !== retry) {
                    return false;
                }
                const tempFilePath = yield this.saveContentToTemp(content);
                try {
                    const mvcmd = process.platform === 'win32' ? 'move /Y' : 'mv -f';
                    const cmdarg = `${mvcmd} "${tempFilePath}" "${this.filePath}"`;
                    yield utils_1.utils.sudoExec(cmdarg, { name: 'Visual Studio Code Background Extension' });
                    return true;
                }
                catch (e) {
                    yield vsc_1.vscode.window.showErrorMessage(e.message);
                    return false;
                }
                finally {
                    yield fs_1.default.promises.rm(tempFilePath);
                }
            }
        });
    }
    /**
     * 保存CSS到临时文件
     *
     * @private
     * @param {string} content CSS文件内容
     * @return {*} 临时文件路径
     * @memberof CssFile
     */
    saveContentToTemp(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempPath = path_1.default.join((0, os_1.tmpdir)(), `vscode-background-${(0, crypto_1.randomUUID)()}.css`);
            yield fs_1.default.promises.writeFile(tempPath, content, constants_1.ENCODING);
            return tempPath;
        });
    }
    /**
     * 清理css中的添加项
     *
     * @param {string} content
     * @return {*}  {string}
     * @memberof CssFile
     */
    clearContent(content) {
        content = content.replace(/\/\*css-background-start\*\/[\s\S]*?\/\*css-background-end\*\//g, '');
        content = content.replace(/\s*$/, '');
        return content;
    }
    /**
     * 是否已经安装过
     *
     * @return {*}  {Promise<boolean>}
     * @memberof CssFile
     */
    hasInstalled() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield this.getContent();
            if (!content) {
                return false;
            }
            return !!~content.indexOf(constants_1.BACKGROUND_VER);
        });
    }
    /**
     * 卸载
     *
     * @return {*}  {Promise<boolean>} 是否成功卸载
     * @memberof CssFile
     */
    uninstall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield utils_1.utils.lock();
                let content = yield this.getContent();
                content = this.clearContent(content);
                // 异常case return
                if (!content.trim().length) {
                    return false;
                }
                return this.saveContent(content);
            }
            catch (ex) {
                console.log(ex);
                return false;
            }
            finally {
                yield utils_1.utils.unlock();
            }
        });
    }
}
exports.CssFile = CssFile;
//# sourceMappingURL=CssFile.js.map