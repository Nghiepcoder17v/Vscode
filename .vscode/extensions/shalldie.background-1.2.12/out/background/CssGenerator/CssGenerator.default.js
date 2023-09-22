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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCssGenerator = exports.DefaultGeneratorOptions = void 0;
const constants_1 = require("../../constants");
const CssGenerator_base_1 = require("./CssGenerator.base");
/**
 * 默认配置
 *
 * @export
 * @class DefaultGeneratorOptions
 */
class DefaultGeneratorOptions {
    constructor() {
        this.useFront = true;
        /**
         * @deprecated
         */
        this.useDefault = true;
        this.style = {};
        this.styles = [];
        this.customImages = [];
        /**
         * @deprecated
         */
        this.loop = false;
        this.interval = 0;
    }
}
exports.DefaultGeneratorOptions = DefaultGeneratorOptions;
/**
 * 默认样式生成
 *
 * @export
 * @class DefaultCssGenerator
 * @extends {AbsCssGenerator<DefaultGeneratorOptions>}
 */
class DefaultCssGenerator extends CssGenerator_base_1.AbsCssGenerator {
    /**
     * 通过配置获取样式文本
     *
     * @private
     * @param {object} options 用户配置
     * @param {boolean} useFront 是否前景图
     * @return {*}  {string}
     * @memberof DefaultCssGenerator
     */
    getStyleByOptions(options, useFront) {
        // 在使用背景图时，排除掉 pointer-events 和 z-index
        const excludeKeys = useFront ? [] : ['pointer-events', 'z-index'];
        return Object.entries(options)
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, value]) => `${key}: ${value};`)
            .join('');
    }
    /**
     * 生成轮播样式
     *
     * @private
     * @param {string[]} images 图片数组
     * @param {number} interval 切换间隔
     * @param {number} index 当前panel索引
     * @return {*}
     * @memberof DefaultCssGenerator
     */
    getCarouselCss(images, interval, index) {
        images = [...images.slice(index), ...images.slice(0, index)];
        const animationName = `background-default-carousel-${index}`;
        const keyframeCSS = this.createKeyFrames(images, interval, animationName);
        if (!keyframeCSS) {
            return '';
        }
        return (0, CssGenerator_base_1.css) `
            animation: ${animationName} ${images.length * interval}s infinite;
            ${keyframeCSS}
        `;
    }
    getCss(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { useDefault, customImages, style, styles, useFront, loop, interval } = Object.assign(Object.assign({}, new DefaultGeneratorOptions()), options);
            // ------ 处理图片 ------
            const images = this.normalizeImageUrls(useDefault ? constants_1.defBase64 : customImages);
            // ------ 默认样式 ------
            const defStyle = this.getStyleByOptions(style, useFront);
            // ------ 在前景图时使用 ::after ------
            const frontContent = useFront ? 'after' : 'before';
            // ------ 生成样式 ------
            return (0, CssGenerator_base_1.css) `
            [id='workbench.parts.editor'] .split-view-view {
                // 处理一块背景色遮挡
                .editor-container .overflow-guard > .monaco-scrollable-element > .monaco-editor-background {
                    background: none;
                }
                // 背景图片样式
                ${images.map((image, index) => {
                const styleContent = defStyle + this.getStyleByOptions(styles[index] || {}, useFront);
                const nthChild = loop ? `${images.length}n + ${index + 1}` : `${index + 1}`;
                return (0, CssGenerator_base_1.css) `
                        /* code editor */
                        &:nth-child(${nthChild}) .editor-instance>.monaco-editor .overflow-guard > .monaco-scrollable-element::${frontContent},
                        /* home screen */
                        &:nth-child(${nthChild}) .empty::before {
                            background-image: url('${image}');
                            ${styleContent}
                            ${this.getCarouselCss(images, interval, index)}
                        }
                    `;
            })}
            }
        `;
        });
    }
}
exports.DefaultCssGenerator = DefaultCssGenerator;
//# sourceMappingURL=CssGenerator.default.js.map