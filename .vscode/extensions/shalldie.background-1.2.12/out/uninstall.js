"use strict";
/**
 * 1. 需要所有 vscode 进程退出，再打开，才会执行 `vscode:uninstall`
 * 2. 不能访问 vscode api
 *
 * https://github.com/microsoft/vscode/issues/155561
 * https://code.visualstudio.com/api/references/extension-manifest#extension-uninstall-hook
 */
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
/**
 * 使用的相关兼容性文件需要引用到具体文件，避免二次导出
 * 涉及文件：
 * `utils/vsc` // uninstall 中用到这个文件的
 * `background/CssFile`
 * `utils` 目录
 */
const fs_1 = __importDefault(require("fs"));
const CssFile_1 = require("./background/CssFile");
const constants_1 = require("./constants");
function uninstall() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cssFilePath = (yield fs_1.default.promises.readFile(constants_1.TOUCH_FILE_PATH, constants_1.ENCODING)).trim();
            if (!cssFilePath) {
                return;
            }
            const file = new CssFile_1.CssFile(cssFilePath);
            const hasInstalled = yield file.hasInstalled();
            if (!hasInstalled) {
                return;
            }
            yield file.uninstall();
            console.log('vscode background has been auto uninstalled.');
        }
        catch (ex) {
            console.error('vscode background uninstalled fail: ' + ex.message);
        }
    });
}
uninstall();
//# sourceMappingURL=uninstall.js.map