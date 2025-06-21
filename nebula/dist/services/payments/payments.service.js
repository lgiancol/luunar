"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPayment = addPayment;
exports.getPayments = getPayments;
exports.getIncomingPayments = getIncomingPayments;
exports.getOutgoingPayments = getOutgoingPayments;
const payments_repository_1 = require("../../repositories/payments/payments.repository");
const payments_model_1 = require("./payments.model");
async function addPayment(data) {
    return (0, payments_repository_1.createPayment)(data);
}
async function getPayments(data) {
    return (0, payments_repository_1.getPaymentsPaginated)(data);
}
async function getIncomingPayments(data) {
    return (0, payments_repository_1.getPaymentsByType)({ ...data, type: payments_model_1.PaymentType.incoming });
}
async function getOutgoingPayments(data) {
    return (0, payments_repository_1.getPaymentsByType)({ ...data, type: payments_model_1.PaymentType.outgoing });
}
