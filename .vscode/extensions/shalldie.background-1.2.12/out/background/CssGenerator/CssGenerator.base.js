"use strict";
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
exports.AbsCssGenerator = exports.css = void 0;
const vscode_1 = __importDefault(require("vscode"));
const stylis = __importStar(require("stylis"));
const constants_1 = require("../../constants");
/**
 * 用于触发开发工具 css in js 语言支持
 *
 * @export
 * @param {TemplateStringsArray} template
 * @param {...any[]} args
 * @return {*}
 */
function css(template, ...args) {
    return template.reduce((prev, curr, i) => {
        let arg = args[i];
        // 注意顺序, 内嵌函数可能返回 Array
        if (typeof arg === 'function') {
            arg = arg();
        }
        if (Array.isArray(arg)) {
            arg = arg.join('');
        }
        return prev + curr + (arg !== null && arg !== void 0 ? arg : '');
    }, '');
}
exports.css = css;
class AbsCssGenerator {
    /**
     * 归一化图片路径
     * 在 v1.51.1 版本之后, vscode 将工作区放入 sandbox 中运行并添加了 file 协议的访问限制, 导致使用 file 协议的背景图片无法显示
     * 当检测到配置文件使用 file 协议时, 需要将其转换为 vscode-file 协议
     * @protected
     * @param {string[]} images 图片列表
     * @return {*}
     * @memberof AbsCssGenerator
     */
    normalizeImageUrls(images) {
        return images.map(imageUrl => {
            if (!imageUrl.startsWith('file://')) {
                return imageUrl;
            }
            // file:///Users/foo/bar.png => vscode-file://vscode-app/Users/foo/bar.png
            const url = imageUrl.replace('file://', 'vscode-file://vscode-app');
            return vscode_1.default.Uri.parse(url).toString();
        });
    }
    /**
     * 创建轮播动画 keyframes
     *
     * @protected
     * @param {string[]} images 图片数组
     * @param {number} interval 切换间隔
     * @param {string} animationName 动画名称
     * @return {*}
     * @memberof AbsCssGenerator
     */
    createKeyFrames(images, interval, animationName) {
        if (images.length <= 1 || interval < 1) {
            return '';
        }
        /**
         * 概设，假设2张图，
         * pd 为 perDuration，图片的渐变时长百分比
         *
         * ---
         *
         * 0%         , 50% - pd/2 {img0}
         * 50% + pd/2 , 100%       {img1}
         *
         * 需要3块frame，并进行偏移来保证效果连贯 =>
         *
         * 0%               ,  50% - pd - pd/2 {img0}
         * 50%  - pd + pd/2 , 100% - pd - pd/2 {img1}
         * 100% - pd        , 100%            {img0}
         *
         */
        const perDuration = 0.6 / (interval * images.length); // 渐变时间/动画总时长，渐变时间在总时长中占比
        const toPercent = (num) => (num * 100).toFixed(3) + '%';
        const perFrame = 1 / images.length; // 每片时长 eg: 0.5
        const frames = [...images, images[0]].map((url, index) => {
            let from = index * perFrame - perDuration + perDuration / 2;
            let to = (index + 1) * perFrame - perDuration - perDuration / 2;
            from = Math.max(from, 0);
            to = Math.min(to, 1);
            return {
                from: toPercent(from),
                to: toPercent(to),
                url
            };
        });
        return css `
            @keyframes ${animationName} {
                ${frames.map(({ from, to, url }) => {
            return css `
                        ${from}, ${to} {
                            background-image: url('${url}');
                        }
                    `;
        })}
            }
        `;
    }
    /**
     * 编译 css
     *
     * @private
     * @param {string} source
     * @return {*}
     * @memberof AbsCssGenerator
     */
    compileCSS(source) {
        return stylis.serialize(stylis.compile(source), stylis.stringify);
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = yield this.getCss(options);
            const styles = this.compileCSS(source);
            if (process.env.NODE_ENV === 'development') {
                console.log(styles);
            }
            return `
        /*css-background-start*/
        /*${constants_1.BACKGROUND_VER}.${constants_1.VERSION}*/
        ${styles}
        /*css-background-end*/
        `;
        });
    }
}
exports.AbsCssGenerator = AbsCssGenerator;
//# sourceMappingURL=CssGenerator.base.js.map