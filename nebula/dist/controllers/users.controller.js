"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const users_service_1 = require("../services/users/users.service");
const controller_utils_1 = require("../utils/controller.utils");
const getAllUsers = async (req, res) => {
    const users = await (0, users_service_1.listUsers)();
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)(users));
};
exports.getAllUsers = getAllUsers;
