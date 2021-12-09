require("dotenv").config({ path: __dirname + "/.env" });
import express from "express";
import connectDb from "./config/db";
import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

// init
const app: any = express();

// * Routes
import tasksRoutes from "./routes/tasks";
import usersRoutes from "./routes/users";

// * MongoDB
connectDb();

// * Variables
const PORT: string | undefined = process.env.PORT;
const apiCurrentVerion: string = "/api/v1/";

// * Middleware
app.use(express.json({ type: "*/*" }));

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
