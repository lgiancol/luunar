"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAddPaymentAccountPayload = mapAddPaymentAccountPayload;
function mapAddPaymentAccountPayload(payload) {
    return {
        name: payload['name'],
        type: payload['type'],
        notes: payload['notes'],
    };
}
