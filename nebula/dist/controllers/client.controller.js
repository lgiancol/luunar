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
exports.getRecentClients = exports.getPaginatedClients = exports.addClientHandler = void 0;
const clientsService = __importStar(require("../services/clients/clients.service"));
const result_1 = require("../types/result");
const controller_utils_1 = require("../utils/controller.utils");
const addClientHandler = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const createClientModel = req.body;
    const clientResult = await clientsService.addClient(createClientModel);
    if ((0, result_1.isResultError)(clientResult)) {
        res.status(500).json({ error: clientResult.error });
        return;
    }
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)(clientResult.data));
};
exports.addClientHandler = addClientHandler;
const getPaginatedClients = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const { page, pageSize } = req.query;
    const result = await clientsService.indexClients({ page: parseInt(page), pageSize: parseInt(pageSize) });
    if ((0, result_1.isResultError)(result)) {
        res.status(500).json({ error: result.error });
        return;
    }
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)(result.data));
};
exports.getPaginatedClients = getPaginatedClients;
const getRecentClients = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const { limit } = req.query;
    const result = await clientsService.fetchRecentClients(parseInt(limit));
    if ((0, result_1.isResultError)(result)) {
        res.status(500).json({ error: result.error });
        return;
    }
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)(result.data));
};
exports.getRecentClients = getRecentClients;
