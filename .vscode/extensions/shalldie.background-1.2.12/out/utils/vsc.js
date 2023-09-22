"use strict";
/**
 * 给无 vscode api 的 case 使用
 * 比如 `vscode:uninstall`
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscode = void 0;
let vscode;
exports.vscode = vscode;
try {
    exports.vscode = vscode = require('vscode');
}
catch (_a) {
    // nothing todo
}
//# sourceMappingURL=vsc.js.map