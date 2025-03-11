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
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const retries = 5;
    let attempt = 0;
    while (attempt < retries) {
        try {
            yield mongoose_1.default.connect(env_1.default.MONGO_URI);
            console.log("Connected to the database");
            return;
        }
        catch (error) {
            attempt++;
            console.error(`Error connecting to the database (attempt ${attempt}/${retries}): `, error);
            if (attempt === retries) {
                process.exit(1);
            }
            yield new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
});
process.on("uncaughtException", (error) => {
    console.error("Uncaught exception: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection: ", error);
    process.exit(1);
});
exports.default = connectToDB;
//# sourceMappingURL=db.js.map