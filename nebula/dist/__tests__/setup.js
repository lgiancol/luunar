"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global test setup
const globals_1 = require("@jest/globals");
// Increase timeout for database operations
globals_1.jest.setTimeout(10000);
// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    log: globals_1.jest.fn(),
    debug: globals_1.jest.fn(),
    info: globals_1.jest.fn(),
    warn: globals_1.jest.fn(),
    error: globals_1.jest.fn(),
};
