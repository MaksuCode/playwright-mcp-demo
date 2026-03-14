import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../..', 'db.json');

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

export interface DB {
  users: User[];
  products: Product[];
  carts: Cart[];
  orders: Order[];
}

export function readDB(): DB {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as DB;
}

export function writeDB(data: DB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
