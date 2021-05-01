import express from "express";

export default async () => {
    const app = express();

    app.set("port", process.env.PORT || 3000);

    await require('./loaders').default({ expressApp: app });

    return app;
}
