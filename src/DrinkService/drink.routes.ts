import { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as schemas from "./drink.schemas";
import * as controllers from "./drink.controller"

export async function DrinkRoutes(
    server: FastifyInstance, options: FastifyPluginOptions) {

server.route({
    method: "GET",
    url: "/drinks",
    schema: schemas.GetDrinkSchema,
    handler: controllers.GetDrinkController
}),

server.route({
    method: "POST",
    url: "/drinks",
    schema: schemas.PostDrinkSchema,
    preHandler: [server.authenticate],
    handler: controllers.PostDrinkController
}),

server.route({
    method: "DELETE",
    url: "/drinks",
    schema: schemas.DeleteDrinkSchema,
    preHandler: [server.authenticate],
    handler: controllers.DeleteDrinkController

}),

server.route({
    method: "PATCH",
    url: "/drinks",
    schema: schemas.UpdateDrinkSchema,
    preHandler: [server.authenticate],
    handler: controllers.UpdateDrinkController
})

 }