import express, { Application, Request, Response } from 'express';
import cores from 'cors';
import { bookRouter } from './app/Controllers/book.controller';
import { borrowRouter } from './app/Controllers/borrowBook.controller';
import { globalErrorHandler } from './app/Custom-Middlewares/errorHandler';


export const app : Application = express();
app.use(cores({origin : 'http://localhost:5173'}));

app.use(express.json());

app.use('/api/books' , bookRouter);
app.use('/api/borrow' , borrowRouter);


app.get('/', (req : Request, res : Response) => {
  res.send('Welcome to Book Library!');
});

app.use(globalErrorHandler);




