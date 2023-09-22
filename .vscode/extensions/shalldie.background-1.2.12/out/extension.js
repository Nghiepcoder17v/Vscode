'use strict';
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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = __importDefault(require("vscode"));
const background_1 = require("./background");
const constants_1 = require("./constants");
const vsHelp_1 = require("./utils/vsHelp");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        // console.log('Congratulations, your extension "background" is now active!');
        // The command has been defined in the package.json file
        // Now provide the implementation of the command with  registerCommand
        // The commandId parameter must match the command field in package.json
        const disposable = vscode_1.default.commands.registerCommand('extension.background.info', function () {
            // 无换行
            // https://github.com/Microsoft/vscode/blob/8616dbae8bc2abf7972a45449b0fb6b2b2d0f429/src/vs/workbench/common/notifications.ts#L412-L413
            vsHelp_1.vsHelp.showInfo([
                //
                `Welcome to use background@${constants_1.VERSION}!`,
                'You can config it in `settings.json`.'
            ].join(' '));
        });
        context.subscriptions.push(disposable);
        const background = new background_1.Background();
        yield background.setup();
        context.subscriptions.push(background);
        context.subscriptions.push(vscode_1.default.commands.registerCommand('extension.background.uninstall', () => __awaiter(this, void 0, void 0, function* () {
            if (!(yield background.hasInstalled())) {
                return;
            }
            if (yield background.uninstall()) {
                // 当且仅当成功删除样式时才会卸载扩展
                // 否则可能导致没有成功删掉样式时扩展就被卸载掉
                yield vscode_1.default.commands.executeCommand('workbench.extensions.uninstallExtension', constants_1.EXTENSION_ID);
                yield vsHelp_1.vsHelp.showInfoRestart('background extension has been uninstalled. See you next time!');
            }
        })));
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    // vscode.window.showInformationMessage('deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map