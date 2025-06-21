"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAddClientPayload = mapAddClientPayload;
function mapAddClientPayload(payload) {
    return {
        name: payload['name'],
        email: payload['email'],
        phone: payload['phone'],
        notes: payload['notes'],
        organizationId: payload['organization_id'],
    };
}
