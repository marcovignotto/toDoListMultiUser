require("dotenv").config({ path: __dirname + "/.env" });
import express from "express";
import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

// init
const app: any = express();

// * MongoDB

// * PORT
const PORT: string | undefined = process.env.PORT;

// * Middleware
// app.use(express.json({ extended: true }));

// * Routes

app.get("/v1/", (req: Request, res: Response): any => {
  try {
    res.json({
      success: true,
      msg: "Welcome to the Multi User ToDo List v1.0",
    });
  } catch (error) {
    console.log(error);
  }
});

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
