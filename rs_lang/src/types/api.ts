import { IWordItemObj } from "./book";


export enum ErrorMessages {
    getWords = "Ошибка при загрузке списка слов.",
    createUser = "Ошибка при создании пользователя. Данный пользователь уже есть.",
    getToken = "Ошибка при получении токена.",
    authorization = "Неверно введены пароль или почта.",
}

export enum ApiUrls {
    words ="words",
    createUser ="users",
    signInUser ="signin",
}


export type TGetWords = (group: number, page: number) => Promise<Array<IWordItemObj>>;

export type TOptionsMethods = "GET" | "POST" | "DELETE" | "PUT";

export interface IAnswerFetch {
    status: number;
    answer: Promise<Array<IWordItemObj>>;
}

export interface IHeaders {
    [key: string]: string;
}
export interface IApiOptions {
    method?: string;
    headers?: IHeaders;
    body?: string;
}

export interface IUserLogInForm {
    email: string;
    password: string;
}

export interface IUserCreateForm extends IUserLogInForm{
    name: string;
}

export interface IServiceApi{
    options: IApiOptions;
}

