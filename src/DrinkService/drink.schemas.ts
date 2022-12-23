export const GetDrinkSchema = {
    response: {
      200: {
        description: "List of all drinks in db",
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { description: "Name of the drink", type: "string" },
            liquor: { description: "Type of liquor", type: "string" },
            mixup: { description: "Type of mixup", type: "string" },
            instructions: { description: "Instructions to make the drink", type: "string" },
            secondLiquor: { description: "Type of second liquor", type: "string"},
            garnish: { description: "Type of garnish", type: "string"}
  
          },
        },
      },
    },
  };

  export const SuccessResponse = {
    201: {
      description: "Success response",
      type: "object",
      properties: {
        success: {type: "boolean"},
        message: {type: "string"}
      }
    }
  }

  export const PostDrinkSchema = {
    body: {
      type: "object",
      required: ["name", "liquor", "mixup", "instructions"],
      properties: {
        name: { description: "Name of the drink", type: "string"},
        liquor: { description: "Type of liquor", type: "string"},
        mixup: { description: "Type of mixup", type: "string"},
        instructions: { description: "Instructions to make the drink", type: "string"},
        secondLiquor: { description: "Type of second liquor", type: "string"},
        garnish: { description: "Type of garnish", type: "string"},
        
      },
    },
    response: SuccessResponse
  }
  
  

  export const DeleteDrinkSchema = {
  body: {
    type: "object",
    required: ["name"],
  properties: {
    name: { description: "Name of the drink", type: "string"},
    
  },
  },
  response: {
    200: {
      description: "Delete response",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" }
      }
    }
  }
  }

  export const UpdateDrinkSchema = {
    body: {
      type: "object",
      properties: {
        name: { description: "The name of the drink", type: "string"},
        liquor: { description: "Type of liquor", type: "string"},
        mixup: { description: "Type of mixup", type: "string"},
        instructions: { description: "Instructions to make the drink", type: "string"},
        secondLiquor: { description: "Type of second liquor", type: "string"},
        garnish: { description: "Type of garnish", type: "string"},
newName: { description: "Updated name of the drink", type: "string"},
newLiquor: { description: "Updated liquor for the drink", type: "string"},
newMixup: { description: "Updated mixup for the drink", type: "string"},
newInstructions: { description: "Updated instructions of how to make the drink", type: "string"},
newsecondLiquor: { description: "Updated second-liquor for the drink", type: "string"},
newGarnish: { description: "Updated garnish for the drink", type: "string"},
      }
    },
    response: SuccessResponse
  }