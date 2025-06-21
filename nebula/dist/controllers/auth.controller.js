"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.logout = exports.login = exports.register = void 0;
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = require("../services/auth.service");
const result_1 = require("../types/result");
const controller_utils_1 = require("../utils/controller.utils");
const register = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) {
        res.status(400).send({ error: 'Missing fields' });
        return;
    }
    const userResult = await (0, auth_service_1.registerUser)(first_name, last_name, email, password);
    if ((0, result_1.isResultError)(userResult)) {
        res.status(500).send({ error: userResult.error });
        return;
    }
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)(userResult.data));
};
exports.register = register;
const login = async (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).json({ error: info.message });
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            res.json((0, controller_utils_1.ModelToResponseBodyMapper)(user));
        });
    })(req, res, next);
};
exports.login = login;
const logout = async (req, res, next) => {
    req.logOut(() => {
        req.session?.destroy(() => {
            res.clearCookie('connect.sid');
            res.json(true);
        });
    });
};
exports.logout = logout;
const validate = async (req, res) => {
    if (req.isAuthenticated()) {
        res.json((0, controller_utils_1.ModelToResponseBodyMapper)(req.user));
        return;
    }
    res.status(401).json({ error: 'Unauthorized' });
};
exports.validate = validate;
