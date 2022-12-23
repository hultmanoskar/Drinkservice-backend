import { FastifyReply, FastifyRequest } from "fastify";
import { IRegisterRequest, IAuthResponse, IUser, IToken, ILoginRequest } from "./auth.interfaces";
import validateEmail from "../Utilities/validateEmail";


export async function RegisterController(request: FastifyRequest<{Body: IRegisterRequest}>, reply: FastifyReply) {


    // Skapar ett response.
const response: IAuthResponse = {
    success: false,
    message: "",
    token: null
};


if (!validateEmail(request.body.email)) {
    response.success = false;
    response.message = "Enter a valid Email address";
return await reply.status(400).send(response)
}


const {UserModel} = request.db.models;

const existsUser = await UserModel.findOne({ email: request.body.email });

// Om användaren redan finns i db.
if (existsUser) {

    
    response.success = false;
    response.message = "User already exist";
    return await reply.status(400).send(response);
}

// skapas + Lägger in ny användare i db.
const newUser: IUser = {
    _id: null,
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    journalIds: []
}

const  createdUser = await UserModel.create(newUser);

// Skapar token direkt efter vi skapat en user
const token: IToken = {
    name: createdUser.name,
    email: createdUser.email,
    userId: createdUser._id,
}

const jwtToken = await reply.jwtSign(token)

response.success = true,
response.message = `User has been created! With the email: ${createdUser.email}`
response.token = jwtToken

await reply.status(201).send(response)

}

export async function LoginController(request: FastifyRequest<{ Body: ILoginRequest}>, reply: FastifyReply) {

    const { UserModel } = request.db.models;

    const response: IAuthResponse = {
        success: false,
        message: "",
        token: null

    }

    const user = await UserModel.findOne({email: request.body.email, password: request.body.password});

    if (!user) {
        
        response.success = false;
        response.message = "User does not exist or wrong password"
        response.token = null;
        return await reply.status(401).send(response);
    }


    const token: IToken = {
        name: user.name,
        email: user.email,
        userId: user._id,
    };

    const jwtToken = await reply.jwtSign(token);

    response.success = true;
    response.message = "Successfully logged in"
    response.token = jwtToken;

    return await reply.status(200).send(response);
    
}