import { ErrorRequestHandler } from 'express';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res , next) => {


  let statusCode = 404;
  let message = 'Something went wrong!';
  let error = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    error = {
      name: err.name,
      errors: err.errors,
    };
  }


  else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
    error = {
      name: err.name,
      path: err.path,
      value: err.value,
      message: err.message,
    };



  }

  else {
    error = {
      name: err.name || 'Error',
      message: err.message || 'Unexpected error occurred'
    };
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: error
  });
};
