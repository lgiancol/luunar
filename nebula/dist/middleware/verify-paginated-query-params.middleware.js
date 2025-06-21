"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaginatedQueryParams = verifyPaginatedQueryParams;
function verifyPaginatedQueryParams(req, res, next) {
    const params = req.query;
    if (!params['page'] || !params['pageSize']) {
        res.status(400).json({ error: 'Please specify page and pageSize in query' });
        return;
    }
    next();
}
