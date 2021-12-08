"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: __dirname + "/.env" });
const express_1 = __importDefault(require("express"));
// init
const app = (0, express_1.default)();
// * MongoDB
// * PORT
const PORT = process.env.PORT;
// * Middleware
// app.use(express.json({ extended: true }));
// * Routes
// app.get("/", (req: Request, res: Response) => res.send("Welcome to the Multi User ToDo List v1.0"));
// * Swagger UI //
// * Set static in prod
// * Page not Found Middleware
// * Listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map