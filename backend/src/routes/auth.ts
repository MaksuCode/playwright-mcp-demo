import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { readDB, writeDB } from '../db';
import { signToken, extractToken, verifyToken } from '../auth';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const db = readDB();
  if (db.users.find(u => u.email === email)) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = {
    id: `u${Date.now()}`,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDB(db);

  const token = signToken({ userId: user.id, email: user.email });
  res.status(201).json({ token, user: { id: user.id, email: user.email } });
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = signToken({ userId: user.id, email: user.email });
  res.json({ token, user: { id: user.id, email: user.email } });
});

router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'ok' });
});

export default router;
