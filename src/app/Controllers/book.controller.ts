import express, { NextFunction, Request, Response } from 'express';
import { Books } from '../Models/book.model';
export const bookRouter = express.Router();

bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { filter, sortBy, sort, limit } = req.query;

        const data = await Books.find(
            filter ? { genre: new RegExp(filter as string, 'i') } : {}
        ).sort({ [sortBy as string || 'createdAt']: sort === 'asc' ? 1 : -1 }).limit(Number(limit) || 10);


        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data
        });

    } catch (error) {
        next(error);

    }

}
);
bookRouter.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.bookId;
        const data = await Books.findById(id);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data
        });

    } catch (error) {
        next(error);

    }

}
);
bookRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const body = req.body;
        if (body.copies !== undefined) {
            body.available = body.copies > 0;
        }
        const data = await Books.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data
        });
    } catch (error) {
        next(error);

    }

}
);
bookRouter.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.bookId;
        const body = req.body;
        if (body.copies !== undefined) {
            body.available = body.copies > 0;
        }
        const data = await Books.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data
        });
    } catch (error) {
        next(error);

    }

}
);
bookRouter.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const data = await Books.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);

    }

}
);
