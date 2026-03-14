import { Router, Request, Response } from 'express';
import { readDB } from '../db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const db = readDB();
  const { category } = req.query as { category?: string };

  const products = category
    ? db.products.filter(p => p.category === category)
    : db.products;

  res.json({ products });
});

export default router;
