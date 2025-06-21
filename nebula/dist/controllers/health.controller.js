"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const controller_utils_1 = require("../utils/controller.utils");
const getHealth = async (req, res) => {
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)({ status: 'ok' }));
};
exports.getHealth = getHealth;
