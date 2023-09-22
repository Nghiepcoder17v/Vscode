"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const lockfile_1 = __importDefault(require("lockfile"));
const constants_1 = require("../constants");
const sudo_prompt_1 = __importDefault(require("@vscode/sudo-prompt"));
/**
 * 等待若干时间
 *
 * @param {number} [delay=0]
 * @return {*}
 */
function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
/**
 * 添加文件锁
 *
 * @return {*}
 */
function lock() {
    return new Promise((resolve, reject) => {
        lockfile_1.default.lock(constants_1.LOCK_PATH, {
            wait: 5000 // 应该能撑200的并发了，，，>_<#@!
        }, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
/**
 * 取消文件锁
 *
 * @return {*}
 */
function unlock() {
    return new Promise((resolve, reject) => {
        lockfile_1.default.unlock(constants_1.LOCK_PATH, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
/**
 * 提权运行
 *
 * @param {string} cmd
 * @param {{ name?: string }} [options={}]
 * @return {*}  {Promise<any>}
 */
function sudoExec(cmd, options = {}) {
    return new Promise((resolve, reject) => {
        sudo_prompt_1.default.exec(cmd, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve([stdout, stderr]);
        });
    });
}
/**
 * 工具包
 */
exports.utils = {
    sleep,
    lock,
    unlock,
    sudoExec
};
//# sourceMappingURL=utils.js.map