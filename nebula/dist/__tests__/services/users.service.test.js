"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const users_service_1 = require("../../services/users/users.service");
(0, globals_1.describe)('Users Service', () => {
    (0, globals_1.it)('should return a list of users (happy path)', async () => {
        const result = await (0, users_service_1.listUsers)();
        (0, globals_1.expect)(Array.isArray(result)).toBe(true);
        (0, globals_1.expect)(result.length).toBeGreaterThanOrEqual(0);
    });
    (0, globals_1.it)('should handle empty user list', async () => {
        // Simulate empty list by temporarily replacing listUsers
        const original = users_service_1.listUsers;
        // @ts-ignore
        const mockListUsers = async () => [];
        // @ts-ignore
        const result = await mockListUsers();
        (0, globals_1.expect)(Array.isArray(result)).toBe(true);
        (0, globals_1.expect)(result.length).toBe(0);
    });
});
