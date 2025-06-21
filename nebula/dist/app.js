"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const prisma_1 = __importDefault(require("./db/prisma"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // if you send cookies or auth headers
}));
app.use(express_1.default.json());
// Session middleware (use a secure secret and configure properly)
app.use((0, express_session_1.default)({
    secret: 'orangutansInTheJungal098', // move to env in prod
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: false, // set true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 24 hour rolling session
    },
}));
// Initialize Passport and restore authentication state, if any, from session
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configure Local Strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return done(null, false, { message: 'Incorrect email.' });
        const valid = await bcryptjs_1.default.compare(password, user.password);
        if (!valid)
            return done(null, false, { message: 'Incorrect password.' });
        // TODO: Create Models and Entities for each table and also mappers 🙃
        return done(null, {
            id: user.id,
            created_at: user.created_at,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    }
    catch (err) {
        return done(err);
    }
}));
// Serialize user ID to session
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user from session by ID
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        done(null, user || false);
    }
    catch (err) {
        done(err);
    }
});
app.use('/api', routes_1.default);
exports.default = app;
