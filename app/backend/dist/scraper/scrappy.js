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
exports.fetchFromWebOrCache = exports.fetchPage = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const jsdom_1 = require("jsdom");
function fetchPage(url) {
    const HTMLData = axios_1.default
        .get(url)
        .then(res => res.data)
        .catch((error) => {
        var _a, _b;
        console.error(`Error: ${(_b = (_a = error.config) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : 'unknown'}.`);
        console.error(error.toJSON());
    });
    return HTMLData;
}
exports.fetchPage = fetchPage;
function fetchFromWebOrCache(url, ignoreCache = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, fs_1.existsSync)((0, path_1.resolve)(__dirname, '.cache'))) {
            (0, fs_1.mkdirSync)('.cache');
        }
        console.log(`Fetching ${url}...`);
        if (!ignoreCache &&
            (0, fs_1.existsSync)((0, path_1.resolve)(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`))) {
            console.log(`${url} from cache`);
            const HTMLData = yield (0, promises_1.readFile)((0, path_1.resolve)(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`), { encoding: 'utf8' });
            const dom = new jsdom_1.JSDOM(HTMLData);
            return dom.window.document;
        }
        else {
            console.log(`fetched new ${url} `);
            const HTMLData = yield fetchPage(url);
            if (!ignoreCache && HTMLData) {
                (0, promises_1.writeFile)((0, path_1.resolve)(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`), HTMLData, { encoding: 'utf8' });
            }
            const dom = new jsdom_1.JSDOM(HTMLData);
            return dom.window.document;
        }
    });
}
exports.fetchFromWebOrCache = fetchFromWebOrCache;
