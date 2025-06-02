import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../generated/prisma';
import { registerUser } from '../services/auth.service';
import { isErr } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const register = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;
  if (!email || !password || !first_name || !last_name) {
    res.status(400).send({ error: 'Missing fields' });
    return;
  }

  const userResult = await registerUser(first_name, last_name, email, password);

  if (isErr(userResult)) {
    res.status(500).send({ error: userResult.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(userResult.data));
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: User, info: Record<string, any>) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json(ModelToResponseBodyMapper(user));
    });
  })(req, res, next);
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logOut(() => {
    req.session?.destroy(() => {
      res.clearCookie('connect.sid');
      res.json(true);
    });
  });
};

export const validate = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json(ModelToResponseBodyMapper(req.user));
    return;
  }
  res.status(401).json({ error: 'Unauthorized' });
};
