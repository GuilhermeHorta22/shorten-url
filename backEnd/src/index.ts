import "./env";
import Fastify from "fastify";
//passar a importaçãao do routes
import { urlRoutes } from "./routes/urlRoutes.js";

const fastify = Fastify({logger: true});

//criar um registro para meu route
fastify.register(urlRoutes, { prefix: 'shorten-url'});

fastify.get('/', async(request, reply) => {
    return { hello: "world"}
});

const start = async () => {
    try
    {
        await fastify.listen({ port: 3003, host: '0.0.0.0'});
        console.log("Servidor rodando em http://localhost:3003");
    }
    catch(err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();