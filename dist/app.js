"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/root', (req, res) => {
    console.log('Reponse de server!!!');
    res.status(200).json({ message: 'hello world' });
});
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}....`);
});
//# sourceMappingURL=app.js.map