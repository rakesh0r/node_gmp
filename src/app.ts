import moduleLoader from './module3';


async function startServer() {
    const app = await moduleLoader();

    app.listen(app.get("port"), () => {
        console.log(
            "App is running at http://localhost:%d",
            app.get("port"),
        );
    }).on('error', (err: any) => {
      process.exit(1);
    });
}
  
startServer();