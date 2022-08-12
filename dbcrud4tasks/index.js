import express from "express";
import {router} from "./routes/tasks_routes.js";
import {routerList} from "./routes/lists_routes2.js";
const port =  4000;
const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}
app.use(logRequest);
app.use(express.json());

app.use(router);
app.use(routerList);

app.listen(port, () => console.log(`Server started on port: ${port}`));
