import { urlService } from "../service/urlService.js";
import { FastifyRequest, FastifyReply } from "fastify";

export class urlController
{
    private service = new urlService();

    //função que cria uma nova url encurtada
    async createUrl(request: FastifyRequest<{Body: {urlLong: string}}>, reply: FastifyReply)
    {
        const url = request.body.urlLong;
        const date = new Date();

        date.setMonth(date.getMonth() + 1); 

        const newUrl = await this.service.createUrlShort(url, date);

        const newBody = {
            urlShort: newUrl
        }

        return reply.code(201).send(newBody);
    }

    //funçao que faz o redirecionamento 
    async redirectUrl(request: FastifyRequest<{Params: {urlShort: string}}>, reply: FastifyReply)
    {
        const url = request.params.urlShort;

        const result = await this.service.redirectUrlShort(url);

        if(!result)
            return reply.code(404).send({message: "Url não encontrada."});

        return reply.redirect(result);
    }
}