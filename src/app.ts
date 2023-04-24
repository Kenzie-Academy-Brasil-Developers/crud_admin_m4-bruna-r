import "express-async-errors";
import express, { Application, json } from "express";
import { HandleErros } from "./error";
import { loginRoutes } from "./routes/login.routes";
import { usersRoutes } from "./routes/users.routes";

const app: Application = express();
app.use(json());

app.use("/login", loginRoutes);
app.use("/users", usersRoutes);

app.use(HandleErros);

export default app;
