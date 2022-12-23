import environment from "./environment";

const swaggerOptions = {


    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: "Drink-App Backend Service",
            description: "The backend server for the drink app",
            version: '1.0.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
    
        },
        host: `localhost:${environment.PORT}`,
        schemes: ["http"],



    }


}

export default swaggerOptions;