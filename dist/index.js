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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Config imports
const env_1 = __importDefault(require("./config/env"));
const db_1 = __importDefault(require("./config/db"));
// Middleware imports
const setAnonymousId_1 = require("./middlewares/setAnonymousId");
const errorhandler_1 = __importDefault(require("./middlewares/errorhandler"));
// Route imports
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.default.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set anonymous ID
app.use(setAnonymousId_1.setAnonymousId);
// Basic route
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the API",
    });
});
// API routes
app.use("/api/v1", routes_1.default);
// Custom middlewares
app.use(errorhandler_1.default);
app.use(notFound_1.default);
// Start the server
app.listen(env_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    console.log(`Server started on port ${env_1.default.PORT}`);
}));
//# sourceMappingURL=index.js.map