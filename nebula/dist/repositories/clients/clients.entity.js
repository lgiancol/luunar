"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreateClientDataToEntity = mapCreateClientDataToEntity;
exports.mapClientEntityToModel = mapClientEntityToModel;
function mapCreateClientDataToEntity(model) {
    return {
        name: model.name,
        email: model.email,
        phone: model.phone,
        notes: model.notes,
        organization_id: model.organizationId,
    };
}
function mapClientEntityToModel(entity) {
    return {
        id: entity.id,
        createdAt: new Date(entity.created_at),
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        notes: entity.notes,
        organizationId: entity.organization_id,
        income: entity.income || 0,
    };
}
