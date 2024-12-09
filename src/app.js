import { Hono } from 'hono';
import { connectDB } from './db';
import authRoutes from './routes/auth';
import crudRoutes from './routes/crud';

const app = new Hono();

// Define routes
app.get('/', (ctx) => ctx.text('Welcome to the Hono + MongoDB API'));
app.route('/auth', authRoutes);
app.route('/api', crudRoutes);

// Start the server
connectDB().then(() => {
    console.log('Connected to MongoDB');
    Bun.serve({
        port: 3000,
        fetch: app.fetch, // Use Hono's fetch handler
    });
    console.log('Server running on http://localhost:3000');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

