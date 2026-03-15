import { Router, Request, Response } from 'express';
import { readDB, writeDB } from '../db';
import { extractToken, verifyToken } from '../auth';

const router = Router();

function requireAuth(req: Request, res: Response): string | null {
  const token = extractToken(req.headers.authorization);
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return null;
  }
  try {
    const payload = verifyToken(token);
    return payload.userId;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
}

router.get('/', (req: Request, res: Response) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const db = readDB();
  const cart = db.carts.find(c => c.userId === userId);
  res.json({ items: cart ? cart.items : [] });
});

router.post('/items', (req: Request, res: Response) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const { productId, quantity } = req.body as { productId?: string; quantity?: number };
  if (!productId || !quantity || quantity < 1) {
    res.status(400).json({ error: 'productId and quantity (>=1) are required' });
    return;
  }

  const db = readDB();
  const product = db.products.find(p => p.id === productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  let cart = db.carts.find(c => c.userId === userId);
  if (!cart) {
    cart = { userId, items: [] };
    db.carts.push(cart);
  }

  const existing = cart.items.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, name: product.name, price: product.price, quantity });
  }

  writeDB(db);
  res.json({ items: cart.items });
});

router.put('/items/:productId', (req: Request, res: Response) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const { productId } = req.params;
  const { quantity } = req.body as { quantity?: number };
  if (!quantity || quantity < 1) {
    res.status(400).json({ error: 'quantity (>=1) is required' });
    return;
  }

  const db = readDB();
  const cart = db.carts.find(c => c.userId === userId);
  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
    return;
  }

  const item = cart.items.find(i => i.productId === productId);
  if (!item) {
    res.status(404).json({ error: 'Item not found in cart' });
    return;
  }

  item.quantity = quantity;
  writeDB(db);
  res.json({ items: cart.items });
});

router.delete('/items/:productId', (req: Request, res: Response) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const { productId } = req.params;

  const db = readDB();
  const cart = db.carts.find(c => c.userId === userId);
  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
    return;
  }

  cart.items = cart.items.filter(i => i.productId !== productId);
  writeDB(db);
  res.json({ items: cart.items });
});

export default router;
