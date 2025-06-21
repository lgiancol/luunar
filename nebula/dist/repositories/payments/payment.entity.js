"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreatePaymentModelToEntity = mapCreatePaymentModelToEntity;
exports.mapPaymentEntityToModel = mapPaymentEntityToModel;
const clients_entity_1 = require("../clients/clients.entity");
const vendor_entity_1 = require("../vendors/vendor.entity");
const payment_account_entity_1 = require("./payment-account.entity");
function mapCreatePaymentModelToEntity(model) {
    return {
        type: model.type,
        received_at: model.receivedAt,
        amount: model.amount,
        client_id: model.clientId,
        vendor_id: model.vendorId,
        payment_account_id: model.paymentAccountId,
        invoice_id: model.invoiceId,
    };
}
function mapPaymentEntityToModel(entity) {
    return {
        id: entity.id,
        createdAt: new Date(entity.created_at),
        type: entity.type,
        receivedAt: new Date(entity.received_at),
        amount: entity.amount,
        clientId: entity.client_id,
        vendorId: entity.vendor_id,
        paymentAccountId: entity.payment_account_id,
        invoiceId: entity.invoice_id,
        paymentAccount: (0, payment_account_entity_1.mapPaymentAccountEntityToModel)(entity.payment_account),
        client: entity.client ? (0, clients_entity_1.mapClientEntityToModel)(entity.client) : null,
        vendor: entity.vendor ? (0, vendor_entity_1.mapVendorEntityToModel)(entity.vendor) : null,
    };
}
