import fastify from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import AuthService from "./AuthService/auth.index";
import database, { Db } from "./Utilities/db";
import environment from "./Utilities/environment";
import fastifySwagger = require("@fastify/swagger");
import swaggerOptions from "./Utilities/swagger";
import fastifySwaggerUi = require("@fastify/swagger-ui");
import Auth from "./Utilities/auth"
import DrinkService from "./DrinkService/drink.index";
import mercurius from "mercurius";
import { graphSchema } from "./graphql/schema";

declare module "fastify" {
    interface FastifyRequest {
        db: Db;
    }

    interface FastifyInstance {
        authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>
    }
}

const server: FastifyInstance = fastify({logger: true});




async function start() {
    
    await server.register(database);

    await server.register(fastifySwagger, swaggerOptions);

    await server.register(fastifySwaggerUi, swaggerOptions);

    await server.register(Auth);

    await server.register(AuthService);

    await server.register(DrinkService);

    await server.register(mercurius, {
        schema: graphSchema,
        subscription: true
    });

    

    server.listen({port: environment.PORT, host: "0.0.0.0"}, (error: Error | null, address: string) => {

if (error) {      
    // Om error är true, då har vi ett fel.
    server.log.error({
        name: error.name,
        message: error.message,
        cause: error.cause,
        stack: error.stack,

    });
    process.exit(1);

    
}

console.log('===============================')
console.log(`======= ENV: DEV ==============`)
console.log(`======= BASE_URL: ${address}`)
console.log(` App listening on the port ${environment.PORT} 🙏`)
console.log('===============================')

    });
}

start();
