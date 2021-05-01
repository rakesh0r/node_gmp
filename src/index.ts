import app from './module3';

app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d",
        app.get("port"),
    );
    console.log("Press CTRL-C to stop");
});