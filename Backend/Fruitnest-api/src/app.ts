import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(cors({ origin: ["https://fruitnest-client.vercel.app", "http://localhost:5173"], credentials: true }));

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to fruitnest api");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
