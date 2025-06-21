"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreateUserDataToEntity = mapCreateUserDataToEntity;
exports.mapUserEntityToModel = mapUserEntityToModel;
function mapCreateUserDataToEntity(model) {
    return {
        email: model.email,
        first_name: model.firstName,
        last_name: model.lastName,
        password: model.password,
    };
}
function mapUserEntityToModel(entity) {
    return {
        id: entity.id,
        createdAt: new Date(entity.created_at),
        email: entity.email,
        firstName: entity.first_name,
        lastName: entity.last_name,
    };
}
