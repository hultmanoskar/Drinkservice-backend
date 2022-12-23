
// Interface - Ett sätt för oss att skapa/definiera en egen typ i Typescript
// som vi sedan kan använda.
export interface IRegisterRequest {
    name: string,
    email: string,
    password: string

}

export interface IAuthResponse {
    success: boolean,
    message: string,
    token: string | null

}

export interface IToken {
    name: string
    email: string,
    userId: string | null

}

export interface ILoginRequest {
    email: string,
    password: string
}


export interface IUser {
    _id: string | null,
    name: string,
    email: string,
    password: string,
    journalIds: Array<string>
    
}


export interface IJournal {
    _id: string,
    title: string,
    content: string,
    date: Date,
    users: Array<string> | null
}