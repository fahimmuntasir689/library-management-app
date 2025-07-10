import express, { NextFunction, Request, Response } from 'express';
import { BorrowBooks } from '../Models/borrow.model';
export const borrowRouter = express.Router();

borrowRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = await BorrowBooks.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    _id: 0,
                     book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1,
                   
                }
            }

        ]);

        res.status(200).json({
            success: true,
            messaage: 'Borrowed books summary retrieved successfully',
            data
        });

    } catch (error) {

        next(error);

    }

}
);
borrowRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book, quantity, dueDate } = req.body;

        const borrowBook = await BorrowBooks.borrowBook(book, quantity);

        const data = await BorrowBooks.create({
            book: borrowBook,
            quantity,
            dueDate
        });
        res.status(201).json({
            success: true,
            messaage: 'Book borrowed successfully',
            data
        });

    } catch (error) {
        next(error);
    }
}
);

