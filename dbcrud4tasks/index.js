import express from "express";
import {router} from "./routes/tasks_routes.js";
import {routerList} from "./routes/lists_routes2.js";
import {sequelizeLists} from "./sequelize/routes/list.routes.js";
import {sequelizeItems} from "./sequelize/routes/item.routes.js";
import cors from "cors";

const port =  4000;
export const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}
app.use(cors());
app.use(logRequest);
app.use(express.json());

app.use(router);
app.use(routerList);

sequelizeLists(app);
sequelizeItems(app);

app.listen(port, () => console.log(`Server started on port: ${port}`));