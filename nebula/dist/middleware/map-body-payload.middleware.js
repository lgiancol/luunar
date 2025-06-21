"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapBodyPayload = mapBodyPayload;
function mapBodyPayload(mapper) {
    return function (req, res, next) {
        const rawBody = req.body;
        if (!rawBody) {
            res.status(400).json({ message: 'No body provided' });
            return;
        }
        req.body = mapper(rawBody);
        next();
    };
}
