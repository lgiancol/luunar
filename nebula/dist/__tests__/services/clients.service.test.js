"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const clients_service_1 = require("../../services/clients/clients.service");
const clientsRepository = __importStar(require("../../repositories/clients/clients.repository"));
globals_1.jest.mock('../../repositories/clients/clients.repository');
const mockCreateClient = clientsRepository.createClient;
const mockFetchClientsPaginated = clientsRepository.fetchClientsPaginated;
const mockFetchRecentClients = clientsRepository.fetchRecentClients;
(0, globals_1.describe)('Clients Service', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('should add client (happy path)', async () => {
        const data = { name: 'C', email: 'c@c.com', phone: '', notes: '', organizationId: 'org' };
        mockCreateClient.mockResolvedValue({ success: true, data: { ...data, id: 'id', createdAt: new Date() } });
        const result = await (0, clients_service_1.addClient)(data);
        (0, globals_1.expect)(mockCreateClient).toHaveBeenCalledWith(data);
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should return error if add client fails', async () => {
        const data = { name: 'C', email: 'c@c.com', phone: '', notes: '', organizationId: 'org' };
        mockCreateClient.mockResolvedValue({ success: false, error: 'fail' });
        const result = await (0, clients_service_1.addClient)(data);
        (0, globals_1.expect)(result.success).toBe(false);
    });
    (0, globals_1.it)('should index clients (happy path)', async () => {
        mockFetchClientsPaginated.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
        const result = await (0, clients_service_1.indexClients)({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(mockFetchClientsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should fetch recent clients (happy path)', async () => {
        mockFetchRecentClients.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
        const result = await (0, clients_service_1.fetchRecentClients)(10);
        (0, globals_1.expect)(mockFetchRecentClients).toHaveBeenCalledWith(10);
        (0, globals_1.expect)(result.success).toBe(true);
    });
});
