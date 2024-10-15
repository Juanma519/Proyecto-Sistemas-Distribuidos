"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./rutas/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(index_1.default);
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});
//para runear primero hay que hace npm run build y luego npm start
//o en vez de npm start, npm run dev 
