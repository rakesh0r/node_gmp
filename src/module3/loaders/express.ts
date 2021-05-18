import express, { Request, Response, NextFunction } from "express";
import routes from '../routers';

export default async ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  app.use(express.json());

  // Load API routes
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};