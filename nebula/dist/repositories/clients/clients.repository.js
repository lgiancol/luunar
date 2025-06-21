"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
exports.fetchClientsPaginated = fetchClientsPaginated;
exports.fetchRecentClients = fetchRecentClients;
const prisma_1 = __importDefault(require("../../db/prisma"));
const result_1 = require("../../types/result");
const pagination_utils_1 = require("../../utils/pagination.utils");
const clients_entity_1 = require("./clients.entity");
async function createClient(data) {
    try {
        const entity = await prisma_1.default.client.create({
            data: (0, clients_entity_1.mapCreateClientDataToEntity)(data),
        });
        return (0, result_1.resultSuccess)(entity, clients_entity_1.mapClientEntityToModel);
    }
    catch (e) {
        const message = e.message ?? 'Failed to create Client';
        return (0, result_1.resultError)(message);
    }
}
async function fetchClientsPaginated({ page, pageSize, }) {
    const skip = (page - 1) * pageSize;
    try {
        const [clients, total, incomeTotals] = await prisma_1.default.$transaction([
            prisma_1.default.client.findMany({
                skip,
                take: pageSize,
                orderBy: { name: 'asc' },
            }),
            prisma_1.default.client.count(),
            prisma_1.default.payment.groupBy({
                by: ['client_id'],
                where: {
                    type: 'incoming',
                    client_id: {
                        not: null,
                    },
                },
                orderBy: {
                    client_id: 'asc',
                },
                _sum: {
                    amount: true,
                },
            }),
        ]);
        // Create a map of client_id to income total
        const incomeMap = new Map(incomeTotals.map((item) => [item.client_id, item._sum?.amount || 0]));
        // Add income to each client
        const clientsWithIncome = clients.map((client) => ({
            ...client,
            income: incomeMap.get(client.id) || 0,
        }));
        const paginationData = {
            data: clientsWithIncome,
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
        return (0, result_1.resultSuccess)(paginationData, (0, pagination_utils_1.mapPaginatedEntities)(clients_entity_1.mapClientEntityToModel));
    }
    catch (e) {
        const message = e.message ?? 'Failed to get Clients';
        return (0, result_1.resultError)(message);
    }
}
async function fetchRecentClients(limit) {
    try {
        const [clients, total] = await prisma_1.default.$transaction([
            prisma_1.default.client.findMany({
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prisma_1.default.client.count(),
        ]);
        const paginationData = {
            data: clients,
            meta: {
                page: 1,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
        return (0, result_1.resultSuccess)(paginationData, (0, pagination_utils_1.mapPaginatedEntities)(clients_entity_1.mapClientEntityToModel));
    }
    catch (e) {
        const message = e.message ?? 'Failed to create Client';
        return (0, result_1.resultError)(message);
    }
}
