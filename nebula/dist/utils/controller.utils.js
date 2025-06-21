"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelToResponseBodyMapper = ModelToResponseBodyMapper;
function ModelToResponseBodyMapper(model) {
    const responseObj = {};
    for (const key in model) {
        const camelCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        const value = model[key];
        if (Array.isArray(value)) {
            responseObj[camelCaseKey] = value.map(ModelObjectToResponseBody);
        }
        else {
            responseObj[camelCaseKey] = ModelObjectToResponseBody(value);
        }
    }
    return responseObj;
}
function ModelObjectToResponseBody(modelObj) {
    if (!(typeof modelObj === 'object') || !modelObj || modelObj instanceof Date)
        return modelObj;
    const responseObj = {};
    for (const key in modelObj) {
        const camelCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        const value = modelObj[key];
        if (Array.isArray(value)) {
            responseObj[camelCaseKey] = value.map(ModelObjectToResponseBody);
        }
        else {
            responseObj[camelCaseKey] = ModelObjectToResponseBody(value);
        }
    }
    return responseObj;
}
