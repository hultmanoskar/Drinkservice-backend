export const RegisterSchema = {
    body: {
        type: "object",
        required: [ "name", "email", "password" ],
        properties: {
            name: { description: "Name of the user", type: "string"},
            email: { description: "Email of the user", type: "string"},
            password: { description: "Password for the user", type: "string"}
        },
    },
    response: {
        200: {
            description: "Success response",
            type: "object",
            properties: {
                success: { description: "If the request was successfull", type: "boolean"},
                message: {description: "Message to return to client", type: "string" },
            },
        },
    },
};

export const LoginSchema = {
    body: {
        type: "object",
        required: [ "email", "password" ],
        properties: {
            email: { description: "Email of the user", type: "string"},
            password: { description: "Password for the user", type: "string"}
        },
    },
    response: {
        200: {
            description: "Success response",
            type: "object",
            properties: {
                success: { description: "If the request was successfull", type: "boolean"},
                message: {description: "Message to return to client", type: "string" },
                token: {description: "The JWT token to log in", type: "string"}
            },
        },
    },
};