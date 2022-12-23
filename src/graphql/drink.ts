import { MercuriusContext } from "mercurius";
import { extendType, objectType, list, nonNull, stringArg } from "nexus";
import { DrinkModel } from "../Models/DrinkModel";


// Mercurius som vi importerar och använder är en graphq adapter för fastify.

const Drink = objectType({
    name: "Drink",
    description: "A drink object",
    definition(t) {
        t.string("name"),
        t.string("liquor"),
        t.string("mixup"),
        t.string("instructions"),
        t.string("secondLiquor"),
        t.string("garnish")
    },
})

export const DrinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("allDrinks", {
            type: list(Drink),
            resolve: async () => DrinkModel.find(),
        })
    },
});

export const DrinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("postDrink", {
            type: Drink,
            description: "Add a new drink",
            args: {
                name: nonNull(
                    stringArg({ description: "Name of the drink"})
                ),
                liquor: nonNull(
                    stringArg({ description: "Type of liquor"})
                ),
                mixup: nonNull(
                    stringArg({ description: "Type of mixup"})
                ),
                instructions: nonNull(
                    stringArg({ description: "Instructions of how to make the drink"})
                ),
                secondLiquor:
                stringArg({ description: "Type of second-liquor"}),
                garnish: 
                stringArg({ description: "Type of garnish"})
                
                
            },
            resolve: async (root, {name, liquor, mixup, instructions, secondLiquor, garnish }, ctx: MercuriusContext) => {
                const newDrink = await new DrinkModel({ name, liquor, mixup, instructions, secondLiquor, garnish }).save()

                ctx.pubsub.publish({
                    topic: "DRINK_CHANGED",
                    payload: newDrink
                })
                
                return newDrink;
            }
        })
    },
})

export const DeleteMutation = extendType({
 type: "Mutation",
 definition(t) {
    t.field("DeleteDrink", {
        type: Drink,
        description: "Delete a drink",
        args: {
            name: nonNull(
                stringArg({ description: "Name of the drink to delete"})
            ),
        },
        resolve: async (root, {name}, ctx: MercuriusContext) => {
            const deletedDrink = await DrinkModel.deleteOne({name})

            ctx.pubsub.publish({
                topic: "DRINK_CHANGED",
                payload: deletedDrink
            })
 
            return deletedDrink;
        }
    })
 },

})