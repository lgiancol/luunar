"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_repository_1 = require("../repositories/users/users.repository");
async function registerUser(firstName, lastName, email, password) {
    const hashed = await bcryptjs_1.default.hash(password, 10);
    return (0, users_repository_1.createUser)({ firstName, lastName, email, password: hashed });
}
