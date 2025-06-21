import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from './db/prisma';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // if you send cookies or auth headers
  }),
);

app.use(express.json());

// Session middleware (use a secure secret and configure properly)
app.use(
  session({
    secret: 'orangutansInTheJungal098', // move to env in prod
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: false, // set true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hour rolling session
    },
  }),
);

// Initialize Passport and restore authentication state, if any, from session
app.use(passport.initialize());
app.use(passport.session());

// Configure Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return done(null, false, { message: 'Incorrect email.' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return done(null, false, { message: 'Incorrect password.' });

      // TODO: Create Models and Entities for each table and also mappers 🙃
      return done(null, {
        id: user.id,
        created_at: user.created_at,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    } catch (err) {
      return done(err);
    }
  }),
);

// Serialize user ID to session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session by ID
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

app.use('/api', routes);

export default app;
