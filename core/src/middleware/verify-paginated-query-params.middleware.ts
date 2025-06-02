import { NextFunction, Request, Response } from 'express';

export function verifyPaginatedQueryParams(req: Request, res: Response, next: NextFunction) {
  const params = req.query;
  if (!params['page'] || !params['pageSize']) {
    res.status(400).json({ error: 'Please specify page and pageSize in query' });
    return;
  }

  next();
}
