"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreatePaymentAccountModelToEntity = mapCreatePaymentAccountModelToEntity;
exports.mapPaymentAccountEntityToModel = mapPaymentAccountEntityToModel;
const payment_entity_1 = require("./payment.entity");
function mapCreatePaymentAccountModelToEntity(model) {
    return {
        type: model.type,
        name: model.name,
        notes: model.notes,
    };
}
function mapPaymentAccountEntityToModel(entity) {
    return {
        id: entity.id,
        createdAt: new Date(entity.created_at),
        type: entity.type,
        name: entity.name,
        notes: entity.notes,
        payments: entity.payments?.map(payment_entity_1.mapPaymentEntityToModel) ?? null,
    };
}
