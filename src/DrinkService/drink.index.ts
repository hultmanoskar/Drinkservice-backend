import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { DrinkRoutes } from "./drink.routes";

async function DrinkService(server: FastifyInstance, options: FastifyPluginOptions) {
    
await server.register(DrinkRoutes);

}

export default DrinkService;