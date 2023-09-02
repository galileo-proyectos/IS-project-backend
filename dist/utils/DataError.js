"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = DataError;
