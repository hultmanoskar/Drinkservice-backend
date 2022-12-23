import { makeSchema } from "nexus";
import { join } from "path";
import { DeleteMutation, DrinkMutation, DrinkQuery } from "./drink";



export const graphSchema = makeSchema({
    types: [DrinkQuery, DrinkMutation, DeleteMutation],
    outputs: {
        typegen: join(__dirname, "generated", "typegen.ts"),
        schema: join(__dirname, "generated", "schema.graphql")
    },
});