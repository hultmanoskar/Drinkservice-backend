import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import mongoose, { Model } from "mongoose";
import { IUser } from "../AuthService/auth.interfaces";
import { IDrink } from "../DrinkService/drink.interfaces";
import { DrinkModel } from "../Models/DrinkModel";
import { UserModel } from "../Models/UserModel";



export interface Models {
    UserModel: Model<IUser>,
    DrinkModel: Model<IDrink>

}

export interface Db {
    models: Models;
}

async function database(server: FastifyInstance, options: FastifyPluginOptions) {

mongoose.set('strictQuery', true);

 //    Lyssnar efter händelser,
 // () => = och kör en annonym funktion som printar ut i log när händelsen inträffat.
mongoose.connection.on("connected", () => {
    server.log.info("MongoDB connected!");
});

mongoose.connection.off("disconnected", () => {
    server.log.info("MongoDB disconnected!");
});

// Ansluter MongoDB databas.
await mongoose.connect("mongodb+srv://Tocajazon:Testar1234@drinkdb.sbfl8ks.mongodb.net/?retryWrites=true&w=majority")

// -- Second DB: "mongodb+srv://Tocajason:pxtMJlthyEvl49WY@bookdb.chiwfey.mongodb.net/?retryWrites=true&w=majority"

const models: Models = { UserModel, DrinkModel, };

// addHook - fångar upp alla request som kommer in, och lägger in ett objekt i requesten,
// innan den har nått våra controllers. 
// Objektet som läggs in, innehåller våra mongoose modeller (ex: "UserModel").
// Modellerna blir då tillgängliga i bla. controllers.
server.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {

    request.db = { models };
});

}

export default fastifyPlugin(database);