import express, { Request, Response, NextFunction } from "express";
import routes from '../routers';
import Logger from './logger';

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

  // Log service method and arguments
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logger.info(`${req.url}  ${req.method} -- ${new Date()}, ${JSON.stringify(req.body)}, ${JSON.stringify(req.params)}`);
    const startHrTime = process.hrtime();

    res.on("finish", () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      Logger.info("Request response time %s : %fms", req.path, elapsedTimeInMs);
    });

    next();
  });

  // Load API routes
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    Logger.error(`Error ${req.url}  ${req.method}  %o`, err);
    res
    .status(err.status || 500)
    .json({
      errors: {
        message: err.message,
      },
    });
  });
};