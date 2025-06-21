"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const prisma_1 = __importDefault(require("../../db/prisma"));
const result_1 = require("../../types/result");
const users_entity_1 = require("./users.entity");
async function createUser(data) {
    try {
        const entity = await prisma_1.default.user.create({
            data: (0, users_entity_1.mapCreateUserDataToEntity)(data),
        });
        return (0, result_1.resultSuccess)(entity, users_entity_1.mapUserEntityToModel);
    }
    catch (e) {
        const message = e.message ?? 'Failed to create User';
        return (0, result_1.resultError)(message);
    }
}
