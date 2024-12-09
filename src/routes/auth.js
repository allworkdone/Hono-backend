import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB } from '../db';

const auth = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

auth.post('/register', async (ctx) => {
    const { username, password } = await ctx.req.json();
    const db = getDB();
    const existingUser = await db.collection('users').findOne({ username });

    if (existingUser) {
        return ctx.json({ message: 'User already exists' }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ username, password: hashedPassword });
    return ctx.json({ message: 'User registered successfully' }, 201);
});

auth.post('/login', async (ctx) => {
    const { username, password } = await ctx.req.json();
    const db = getDB();
    const user = await db.collection('users').findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return ctx.json({ message: 'Invalid credentials' }, 401);
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return ctx.json({ token, username: user.username });
});

export default auth;
