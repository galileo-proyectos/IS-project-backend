"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// setup
const app = (0, express_1.default)();
app.set('PORT', 3555);
// other configs goes here
// middlewares goes here
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes goes here
// starting server
app.listen(app.get('PORT'), () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${app.get('PORT')}`);
});
