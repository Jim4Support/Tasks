import {findAll} from "../controllers/list.controller.js";
import Router from 'express';

export function sequelize(app) {
    const router = Router();

    router.get("/", findAll);

    app.use('/api/lists', router);
}