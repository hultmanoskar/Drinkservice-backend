export interface IDrink {
    name: string,
    liquor: string,
    mixup: string,
    instructions: string,
    secondLiquor: string | null,
    garnish: string | null,

}

export interface IUpdateDrink {
    name: string,
    liquor: string,
    mixup: string,
    instructions: string,
    secondLiquor: string | null,
    garnish: string | null,
    newName: string| null,
    newLiquor: string | null,
    newMixup: string | null,
    newInstructions: string | null,
    newSecondLiquor: string | null,
    newGarnish: string | null,
}

export interface IDrinkResponse {
   success: boolean,
   message: string
}