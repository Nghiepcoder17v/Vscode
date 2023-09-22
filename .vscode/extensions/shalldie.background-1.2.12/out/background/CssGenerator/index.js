"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssGenerator = void 0;
const CssGenerator_default_1 = require("./CssGenerator.default");
const CssGenerator_fullscreen_1 = require("./CssGenerator.fullscreen");
/**
 * 样式生成工厂
 *
 * @export
 * @class CssGenerator
 */
class CssGenerator {
    static create(options) {
        var _a, _b, _c, _d;
        if (((_b = (_a = options.fullscreen) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.length) || ((_d = (_c = options.fullscreen) === null || _c === void 0 ? void 0 : _c.images) === null || _d === void 0 ? void 0 : _d.length)) {
            return new CssGenerator_fullscreen_1.FullScreenCssGenerator().create(options.fullscreen);
        }
        return new CssGenerator_default_1.DefaultCssGenerator().create(options);
    }
}
exports.CssGenerator = CssGenerator;
//# sourceMappingURL=index.js.map