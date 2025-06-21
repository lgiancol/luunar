"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAddVendorPayload = mapAddVendorPayload;
function mapAddVendorPayload(payload) {
    return {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        notes: payload.notes,
        organizationId: payload.organization_id,
    };
}
