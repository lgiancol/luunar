"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultSuccess = resultSuccess;
exports.resultError = resultError;
exports.isResultSucces = isResultSucces;
exports.isResultError = isResultError;
function resultSuccess(data, mapper) {
    return { success: true, data: mapper(data) };
}
function resultError(error) {
    return { success: false, error };
}
function isResultSucces(res) {
    return res.success;
}
function isResultError(res) {
    return !res.success;
}
