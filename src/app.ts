import moduleLoader from './module3';
import Logger from './module3/loaders/logger';


async function startServer() {
    const app = await moduleLoader();

    app.listen(app.get("port"), () => {
        Logger.info(
            "App is running at http://localhost:%d",
            app.get("port"),
        );
    }).on('error', (err: any) => {
      Logger.error(err);
      process.exit(1);
    });

    process.on('unhandledRejection', error => {
        Logger.error('unhandledRejection', error);
    });
    
    process.on('uncaughtException', error => {
        Logger.error('uncaughtException', error)
    });
}
  
startServer();