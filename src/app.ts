import cors from 'cors';
import express from 'express';
import { healthRouter } from './routes/health.routes.js';
import { followRouter } from './routes/follow.routes.js';
import { AppError } from './errors/app-error.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(healthRouter);
app.use(followRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: 'Internal server error.' });
});
