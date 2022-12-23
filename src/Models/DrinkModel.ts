import { model, Schema } from "mongoose";
import { IDrink } from "../DrinkService/drink.interfaces"

const DrinkSchema = new Schema<IDrink>({
    name: { type: String, required: true},
    liquor: { type: String, required: true},
    mixup: { type: String, required: true},
    instructions: { type: String, required: true},
    secondLiquor: { type: String, required: false},
    garnish: { type: String, required: false},


});

export const DrinkModel = model<IDrink>("Drink", DrinkSchema);