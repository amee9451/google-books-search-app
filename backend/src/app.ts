import express from 'express';
import cors from 'cors';
import booksRoutes from './routes/booksRoutes';
import limiter from './middlewares/rateLimit';
import compression from 'compression';


const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(limiter);

app.use('/api/books',limiter, booksRoutes);
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The route ${req.originalUrl} does not exist.`,
  });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.',
  });
});

export default app;
