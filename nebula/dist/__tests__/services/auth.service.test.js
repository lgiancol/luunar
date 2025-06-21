"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const auth_service_1 = require("../../services/auth.service");
const users_repository_1 = require("../../repositories/users/users.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
globals_1.jest.mock('../../repositories/users/users.repository');
globals_1.jest.mock('bcryptjs');
const mockBcryptHash = bcryptjs_1.default.hash;
const mockCreateUser = users_repository_1.createUser;
(0, globals_1.describe)('Auth Service', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('should register user with hashed password', async () => {
        mockBcryptHash.mockResolvedValue('hashedpw');
        mockCreateUser.mockResolvedValue({
            success: true,
            data: {
                id: 'u1',
                email: 'a@b.com',
                firstName: 'A',
                lastName: 'B',
                createdAt: new Date()
            }
        });
        const result = await (0, auth_service_1.registerUser)('A', 'B', 'a@b.com', 'pw');
        (0, globals_1.expect)(mockBcryptHash).toHaveBeenCalledWith('pw', 10);
        (0, globals_1.expect)(mockCreateUser).toHaveBeenCalledWith({ firstName: 'A', lastName: 'B', email: 'a@b.com', password: 'hashedpw' });
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should return error if createUser fails', async () => {
        mockBcryptHash.mockResolvedValue('hashedpw');
        mockCreateUser.mockResolvedValue({ success: false, error: 'fail' });
        const result = await (0, auth_service_1.registerUser)('A', 'B', 'a@b.com', 'pw');
        (0, globals_1.expect)(result.success).toBe(false);
        if (!result.success)
            (0, globals_1.expect)(result.error).toBe('fail');
    });
});
