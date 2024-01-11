import express from "express";
var bodyParser = require("body-parser");
import helmet from "helmet";
import { injectable } from "inversify";
import { ProjectsRouter, UserRouter } from "./routers";
// const rateLimit = require('express-rate-limit');
// const slowDown = require("express-slow-down");
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
var cors = require("cors");
require("dotenv").config();

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	max: 100,
// 	standardHeaders: true,
// 	legacyHeaders: false,
// });
// const speedLimiter = slowDown({
//   windowMs: 15 * 60 * 1000,
//   delayAfter: 100,
//   delayMs: 500
// });

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TF API",
            version: "1.0.0",
            description: "TF API Docs",
            servers: ["http://localhost:3000"],
        },
        servers: [
            {
              url: 'http://localhost:3000',
            },
          ],
    },
    apis: ["./src/routers/*.ts"],
};

const swagger = swaggerJSDoc(swaggerOptions);

@injectable()
export class App {
    private _app: express.Application;

    constructor(
        private projectsRouter: ProjectsRouter,
        private userRouter: UserRouter
    ) {
        this._app = express();
        this.config();
    }

    public get app(): express.Application {
        return this._app;
    }

    private config(): void {
        // parse application/x-www-form-urlencoded
        this._app.use(bodyParser.urlencoded({ extended: false }));

        // parse application/json
        this._app.use(bodyParser.json());
        // helmet security
        this._app.use(helmet());
        //support application/x-www-form-urlencoded post data
        this._app.use(bodyParser.urlencoded({ extended: false }));

        this._app.use(cookieParser());

        let allowedOrigins = [/\.forestadmin\.com$/, /localhost:\d{4}$/, process.env.FRONT_URL];
        if (process.env.CORS_ORIGINS) {
            allowedOrigins = allowedOrigins.concat(process.env.CORS_ORIGINS.split(','));
        }
        // const corsConfig = {
        //     origin: allowedOrigins,
        //     allowedHeaders: ['Forest-Context-Url', 'Authorization', 'X-Requested-With', 'Content-Type'],
        //     methods: 'GET, POST, PUT, DELETE',
        //     maxAge: 86400, // NOTICE: 1 day
        //     credentials: true,
        // };

        this._app.use(cors());
        // this._app.use(limiter);
        // this._app.use(speedLimiter);

        //Initialize app routes
        this._initRoutes();
    }

    private _initRoutes() {
        this._app.use("/api/projects", this.projectsRouter.router);
        this._app.use("/api/user", this.userRouter.router);
        this._app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swagger));
    }

}
