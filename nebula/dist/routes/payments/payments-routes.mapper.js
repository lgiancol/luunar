"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAddPaymentPayload = mapAddPaymentPayload;
function mapAddPaymentPayload(payload) {
    return {
        type: payload['type'],
        receivedAt: new Date(payload['received_at']),
        amount: payload['amount'],
        paymentAccountId: payload['payment_account_id'],
        clientId: payload['client_id'],
        vendorId: payload['vendor_id'],
        invoiceId: payload['invoice_id'],
    };
}
