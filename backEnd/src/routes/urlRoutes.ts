import { urlController} from "../controller/urlController.js";
import { FastifyInstance } from "fastify";


export async function urlRoutes(app: FastifyInstance)
{
    const controller = new urlController();

    app.post('/', controller.createUrl.bind(controller));
    app.get('/:urlShort', controller.redirectUrl.bind(controller));
}
