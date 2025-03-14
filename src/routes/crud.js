import { Hono } from 'hono';
import { getDB } from '../db';
import { authMiddleware } from '../middleware/authMiddleware';
import { ObjectId } from 'mongodb';

const crud = new Hono();

crud.use('*', authMiddleware);

crud.get('/items', async (ctx) => {
    try {
        const db = getDB();
        const items = await db.collection('items').find().toArray();
        return ctx.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        return ctx.text('Internal Server Error', 500);
    }
});


crud.post('/items', async (ctx) => {
    const db = getDB();
    const data = await ctx.req.json();
    const result = await db.collection('items').insertOne(data);
    return ctx.json({ id: result.insertedId });
});

crud.get('/items/:id', async (ctx) => {
    const db = getDB();
    const id = ctx.req.param('id');

    // Validate if the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
        return ctx.json({ message: 'Invalid ID format' }, 400);
    }

    try {
        const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
        if (!item) {
            return ctx.json({ message: 'Item not found' }, 404);
        }
        return ctx.json(item, 200);
    } catch (error) {
        return ctx.json({ message: 'Server Error' }, 500);
    }
});



crud.put('/items/:id', async (ctx) => {
    const db = getDB();
    const id = ctx.req.param('id');
    const data = await ctx.req.json();
    const result = await db.collection('items').updateOne({ _id: new ObjectId(id) }, { $set: data });

    if (!result.matchedCount) return ctx.text('Item not found', 404);
    return ctx.json({ message: 'Item updated successfully' });
});

crud.delete('/items/:id', async (ctx) => {
    const db = getDB();
    const id = ctx.req.param('id');
    const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) return ctx.text('Item not found', 404);
    return ctx.json({ message: 'Item deleted successfully' });
});

export default crud;
