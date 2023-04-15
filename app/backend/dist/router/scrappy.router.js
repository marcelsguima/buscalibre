"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scrappy_controller_1 = require("../controller/scrappy.controller");
const scrappyRouter = (0, express_1.Router)();
scrappyRouter.get('/', scrappy_controller_1.fetchPageController);
exports.default = scrappyRouter;
