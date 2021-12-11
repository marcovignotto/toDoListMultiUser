require("dotenv").config({ path: __dirname + "/.env" });
import express from "express";
import connectDb from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

// init
const app = express();

// * Routes
import tasksRoutes from "./routes/tasks";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";

// * MongoDB
connectDb();

// * Variables
const PORT: string | undefined = process.env.PORT;
const apiCurrentVerion: string = "/api/v1/";

// * Middleware

const corsOptions = {
  // origin: ["*"], //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  morgan(
    "dev",
    ":method :url :status :res[content-length] - :response-time ms - [:date[clf]]"
  )
);
app.use(
  express
    .json
    // { type: "*/*" }
    ()
);

// * Routes

app.get(apiCurrentVerion, (req: Request, res: Response): any => {
  try {
    res.json({
      success: true,
      msg: "Welcome to the Multi User ToDo List v1.0",
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(apiCurrentVerion + "tasks", tasksRoutes);
app.use(apiCurrentVerion + "users", usersRoutes);
app.use(apiCurrentVerion + "auth", authRoutes);

// * Swagger UI //

// * Set static in prod

// * Page not Found Middleware

app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: 404,
    success: false,
    msg: "Page not Found!",
  });
});

// * Global errror hanlder
app.use(((err: any, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.status || 500).send({
    success: false,
    msg: err.msg || "Something went wrong!",
  });
}) as ErrorRequestHandler);

// * Listen
app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`));
