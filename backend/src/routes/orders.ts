import { Router, Request, Response } from 'express';
import { readDB, writeDB } from '../db';
import { extractToken, verifyToken } from '../auth';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const token = extractToken(req.headers.authorization);
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  let userId: string;
  try {
    userId = verifyToken(token).userId;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  const db = readDB();
  const cart = db.carts.find(c => c.userId === userId);
  if (!cart || cart.items.length === 0) {
    res.status(400).json({ error: 'Cart is empty' });
    return;
  }

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = {
    id: `o${Date.now()}`,
    userId,
    items: [...cart.items],
    total: Math.round(total * 100) / 100,
    createdAt: new Date().toISOString(),
  };

  db.orders.push(order);
  cart.items = [];
  writeDB(db);

  res.status(201).json({
    orderId: order.id,
    items: order.items,
    total: order.total,
    createdAt: order.createdAt,
  });
});

export default router;
