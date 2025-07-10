import mongoose, { Schema } from 'mongoose';
import { IBook } from '../Interfaces/book.interface';

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'title is mandatory']
    },
    author: {
        type: String,
        required: [true, 'author is mandatory']
    },
    genre: {
        type: String,
        required: [true, 'genre is mandatory'],
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: {
        type: String,
        required: [true, 'isbn is mandatory'],
        unique: [true , 'isbn must be unique']
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: [true, 'copies should be mentioned'],
        min: [0, 'Copies must be a positive number'],
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be an integer'
        }

    },
    available: {
        type: Boolean,
        default: true
    }

},
    {
        versionKey: false,
        timestamps: true
    });

export const Books = mongoose.model<IBook>('Books', bookSchema);