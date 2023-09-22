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
exports.FullScreenCssGenerator = exports.FullScreenGeneratorOptions = void 0;
const vscode_1 = __importDefault(require("vscode"));
const CssGenerator_base_1 = require("./CssGenerator.base");
// 从 1.78.0 开始使用 Chromium:108+，支持 :has 选择器
const BODY_SELECTOR = parseFloat(vscode_1.default.version) >= 1.78 ? `body:has([id='workbench.parts.editor'])` : 'body';
/**
 * 全屏配置
 *
 * @export
 * @class FullScreenGeneratorOptions
 */
class FullScreenGeneratorOptions {
    constructor() {
        /**
         * 图片
         * @deprecated
         * @memberof FullScreenGeneratorOptions
         */
        this.image = '';
        /**
         * 图片
         * @memberof FullScreenGeneratorOptions
         */
        this.images = [];
        this.opacity = 0.91; // 建议在 0.85 ~ 0.95 之间微调
        this.size = 'cover';
        this.position = 'center';
        this.interval = 0;
    }
}
exports.FullScreenGeneratorOptions = FullScreenGeneratorOptions;
/**
 * 全屏样式生成
 *
 * @export
 * @class FullScreenCssGenerator
 * @extends {AbsCssGenerator<FullScreenGeneratorOptions>}
 */
class FullScreenCssGenerator extends CssGenerator_base_1.AbsCssGenerator {
    getCarouselCss(images, interval) {
        const animationName = 'background-fullscreen-carousel';
        const keyframeCSS = this.createKeyFrames(images, interval, animationName);
        if (!keyframeCSS) {
            return '';
        }
        return (0, CssGenerator_base_1.css) `
            ${BODY_SELECTOR} {
                animation: ${animationName} ${images.length * interval}s infinite;
            }
            ${keyframeCSS}
        `;
    }
    getCss(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { size, position, opacity, image, images, interval } = Object.assign(Object.assign({}, new FullScreenGeneratorOptions()), options);
            // ------ 处理图片 ------
            const allImages = images.slice();
            // 兼容下 image 字段
            if (Array.isArray(image)) {
                allImages.push(...image);
            }
            if (typeof image === 'string' && image.length) {
                allImages.push(image);
            }
            const nextImages = this.normalizeImageUrls(allImages);
            return (0, CssGenerator_base_1.css) `
            ${BODY_SELECTOR} {
                background-size: ${size};
                background-repeat: no-repeat;
                background-attachment: fixed; // 兼容 code-server，其他的不影响
                background-position: ${position};
                opacity: ${opacity};
                background-image: url('${nextImages[0]}');
            }
            ${this.getCarouselCss(nextImages, interval)}
        `;
        });
    }
}
exports.FullScreenCssGenerator = FullScreenCssGenerator;
//# sourceMappingURL=CssGenerator.fullscreen.js.map