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
exports.fetchPageController = void 0;
const scrappy_service_1 = require("../service/scrappy.service");
function fetchPageController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ message: 'Missing URL parameter' });
        }
        const document = yield (0, scrappy_service_1.fetchFromWebOrCache)(url);
        if (!document) {
            return res.status(500).json({ message: 'Failed to fetch document' });
        }
        return res.json({ document });
    });
}
exports.fetchPageController = fetchPageController;
