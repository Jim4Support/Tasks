import express from "express";
import {router} from "./routes/tasks_routes.js";
const port =  4000;
const app = express();

app.use(router);
app.use(express.json());

app.listen(port, () => console.log(`Server started on port: ${port}`));