"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.userController.createUser);
router.get("/", user_controller_1.userController.getAllUsers);
router.delete("/:id", user_controller_1.userController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=user.routes.js.map