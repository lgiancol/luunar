"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapVendorEntityToModel = mapVendorEntityToModel;
exports.mapCreateVendorModelToEntity = mapCreateVendorModelToEntity;
function mapVendorEntityToModel(entity) {
    return {
        id: entity.id,
        createdAt: entity.created_at,
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        notes: entity.notes,
        organizationId: entity.organization_id,
        income: entity.income || 0,
    };
}
function mapCreateVendorModelToEntity(model) {
    return {
        name: model.name,
        email: model.email,
        phone: model.phone,
        notes: model.notes,
        organization_id: model.organizationId,
    };
}
