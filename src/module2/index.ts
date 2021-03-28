import express from "express";
import userRoutes from "./user-route";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());

app.use(userRoutes);

app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d",
        app.get("port"),
    );
    console.log("Press CTRL-C to stop");
});

export default app;