"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAnonymousId = void 0;
const uuid_1 = require("uuid");
const setAnonymousId = (req, res, next) => {
    let anonymousId = req.cookies.anonymousId;
    if (!anonymousId) {
        anonymousId = (0, uuid_1.v4)();
        res.cookie("anonymousId", anonymousId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
    }
    req.anonymousId = anonymousId;
    next();
};
exports.setAnonymousId = setAnonymousId;
//# sourceMappingURL=setAnonymousId.js.map