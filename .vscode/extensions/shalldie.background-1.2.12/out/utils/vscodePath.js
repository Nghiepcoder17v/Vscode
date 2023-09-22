"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodePath = void 0;
const path_1 = __importDefault(require("path"));
const vsc_1 = require("./vsc");
// 基础目录
const base = path_1.default.dirname(require.main.filename);
// css文件路径
const cssName = 'workbench.desktop.main.css';
// https://github.com/microsoft/vscode/pull/141263
const webCssName = 'workbench.web.main.css';
const cssPath = (() => {
    const getCssPath = (cssFileName) => path_1.default.join(base, 'vs', 'workbench', cssFileName);
    const defPath = getCssPath(cssName);
    const webPath = getCssPath(webCssName);
    // See https://code.visualstudio.com/api/references/vscode-api#env
    switch (vsc_1.vscode === null || vsc_1.vscode === void 0 ? void 0 : vsc_1.vscode.env.appHost) {
        case 'desktop':
            return defPath;
        case 'web':
        default:
            return webPath;
    }
})();
// electron 入口文件所在文件夹
const indexDir = path_1.default.join(base, 'vs', 'workbench', 'electron-browser', 'bootstrap');
exports.vscodePath = {
    /**
     * 基础目录
     */
    base,
    /**
     * css文件路径
     */
    cssPath,
    /**
     * electron 入口文件所在文件夹
     */
    indexDir
};
//# sourceMappingURL=vscodePath.js.map