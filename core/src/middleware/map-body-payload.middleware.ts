import { NextFunction, Request, Response } from 'express';
import { ResponseMapper } from '../types/result';

export function mapBodyPayload<D>(mapper: ResponseMapper<any, D>) {
  return function (req: Request, res: Response, next: NextFunction) {
    const rawBody = req.body;
    if (!rawBody) {
      res.status(400).json({ message: 'No body provided' });
      return;
    }

    req.body = mapper(rawBody);

    next();
  };
}
