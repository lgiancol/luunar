"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVendor = addVendor;
exports.getVendors = getVendors;
exports.getRecentVendorsService = getRecentVendorsService;
const vendors_repository_1 = require("../../repositories/vendors/vendors.repository");
async function addVendor(data) {
    return (0, vendors_repository_1.createVendor)(data);
}
async function getVendors(data) {
    return (0, vendors_repository_1.getVendorsPaginated)(data);
}
async function getRecentVendorsService(limit) {
    return (0, vendors_repository_1.getRecentVendors)(limit);
}
