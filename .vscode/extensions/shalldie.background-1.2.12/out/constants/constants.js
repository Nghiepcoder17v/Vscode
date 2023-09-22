"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOUCH_FILE_PATH = exports.LOCK_PATH = exports.EXTENSION_ID = exports.EXTENSION_NAME = exports.PUBLISHER = exports.ENCODING = exports.BACKGROUND_VER = exports.VERSION = void 0;
const path_1 = __importDefault(require("path"));
const package_json_1 = __importDefault(require("../../package.json"));
/** 版本号 */
exports.VERSION = package_json_1.default.version;
/** 版本标识 */
exports.BACKGROUND_VER = 'background.ver';
/** 文件编码 */
exports.ENCODING = 'utf-8';
/** 发布者 */
exports.PUBLISHER = package_json_1.default.publisher;
/** 扩展名 */
exports.EXTENSION_NAME = package_json_1.default.name;
/** 扩展ID */
exports.EXTENSION_ID = `${exports.PUBLISHER}.${exports.EXTENSION_NAME}`;
/** 文件锁路径 */
exports.LOCK_PATH = path_1.default.join(__dirname, '../../', `${exports.EXTENSION_ID}.lock`);
/** 版本临时文件，存放css路径、标识初次安装 */
exports.TOUCH_FILE_PATH = path_1.default.join(__dirname, `../../vscb.${exports.VERSION}.touch`);
//# sourceMappingURL=constants.js.map