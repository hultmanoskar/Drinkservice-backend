import { FastifyReply, FastifyRequest } from "fastify";
import { IDrink, IUpdateDrink } from "./drink.interfaces";

export async function GetDrinkController(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
  
try {
        
  const { DrinkModel } = request.db.models;
  
  const drinks = await DrinkModel.find({});
  return `All drinks: 
  ${drinks}`;
  
  
    } catch (error) {
        request.log.error(error);
        await reply.status(500).send("An error occured fetching the drinks!");

    }
  
  }

  export async function PostDrinkController(
    request: FastifyRequest<{ Body: IDrink}>,
    reply: FastifyReply
  ){
  
  try {
    
  const { DrinkModel } = request.db.models;
  
  const existingDrink = await DrinkModel.findOne({ name: request.body.name });

  if (existingDrink) {
    reply.code(404);
    return {
        success: false,
        message: "It already exist a drink with that name in the database!"
    }
  }

  /* if (existingDrink._id === request.body._id) {
    reply.code(401);
    return {
        success: false,
        message: "This id is already taken"
    }
  } */


  const newDrink = await DrinkModel.create(request.body);

  reply.code(201);
  
  return {success: true, message: `The drink ${newDrink.name} was uploaded!`};
  
  
  } catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occured when uploading drink");
    
  }
  
  }

  export async function DeleteDrinkController(request: FastifyRequest<{ Body: IDrink}>, reply: FastifyReply) {
    
try {

const { DrinkModel } = request.db.models;

const  { deletedCount }  = await DrinkModel.deleteOne({name: request.body.name});

if ( deletedCount === 0 ) {
reply.code(404);

return {
    success: false,
    message: "Drink could not be found! Try a different name",

}
}

return {
    success: true,
    message: `The drink ${request.body.name} has been deleted`
}

} catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occured when deleting drinks");
}

  }

  export async function UpdateDrinkController(request: FastifyRequest<{ Body: IUpdateDrink}>, reply: FastifyReply) {
    
try {
    
const { DrinkModel } = request.db.models;

const drinkToUpdate = await DrinkModel.findOneAndUpdate({name: request.body.name},
   {$set:{name: request.body.newName,
    liquor: request.body.newLiquor, 
    mixup: request.body.newMixup,
    instructions: request.body.newInstructions, 
    secondLiquor: request.body.newSecondLiquor, 
    garnish: request.body.newGarnish}});

if (!drinkToUpdate) {
reply.code(400);

return {
    sucess: false,
    message: "No drink exist with this name"
}
}

return {
    
    success: true,
    message: `Drink has been updated. Updated drink: ${drinkToUpdate.name}`
}


} catch (error) {
    request.log.error(error);
    await reply.status(500).send("An error occurred when updating drinks")
}

  }


  
 