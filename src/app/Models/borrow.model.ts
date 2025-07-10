import mongoose, { Model, Schema } from 'mongoose';
import { BorrowStatic, IBorrow } from '../Interfaces/borrow.interface';
import { Books } from './book.model';

const borrowSchema = new Schema<IBorrow, BorrowStatic>({

  book: {

    type: Schema.Types.ObjectId,
    required: [true, 'book id should be mentioned']
  },

  quantity: {

    type: Number,
    required: [true, 'quantity should be mentioned'],
    min: [0, 'quantity must be a positive number'],

    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an Integer'
    },

  },

  dueDate: {
    type: Date,
    required: [true, 'dueDate should be mentioned']
  }

},
  {
    versionKey: false,
    timestamps: true

  });

borrowSchema.static('borrowBook', async function (bookId: string, quantity: number) {

  const book = await Books.findById(bookId);

  if (!book) {
    throw new Error('Book is not found');
  }
  if(book.copies < 0){
    throw new Error('copies must be positive number');
  }

  if (book.copies === 0) {
    book.available = false;
    throw new Error('Book is not available');
  }

  if (book.copies < quantity) {
    throw new Error('Not enough copies are available');
  }
  if (quantity < 0) {
    throw new Error('quantity should not be negative');
  }
  if(quantity ===0){
    throw new Error('No book has been borrowed');
  }

  book.copies = book.copies - quantity;

  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;

});

export const BorrowBooks = mongoose.model<IBorrow, Model<IBorrow> & BorrowStatic>(
  'BorrowBooks',
  borrowSchema
);
