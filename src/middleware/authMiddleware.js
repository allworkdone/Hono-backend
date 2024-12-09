import jwt from 'jsonwebtoken';

export function authMiddleware(ctx, next) {
    const authHeader = ctx.req.header('Authorization'); // Use ctx.req.header()

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Missing or invalid Authorization header');
        return ctx.text('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        ctx.req.user = user; // Attach user to the request context
        console.log('Authenticated User:', user);
        return next(); // Proceed to the next middleware or handler
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return ctx.text('Invalid token', 403);
    }
}

