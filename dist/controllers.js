"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataError_1 = __importDefault(require("./utils/DataError"));
exports.default = (app) => {
    // app.use(.....);
    // error route
    app.use((error, req, res, next) => {
        console.log(error);
        if (error instanceof DataError_1.default) {
            res.status(400).json({
                message: error.message
            });
        }
        else {
            res.sendStatus(500);
        }
    });
};
