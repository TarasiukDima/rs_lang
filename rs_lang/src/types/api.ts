import { IWordItemObj } from "./book";


export enum ErrorMessages {
    getWords = "Ошибка при загрузке списка слов.",
    getWordsUser = "Ошибка при загрузке списка слов пользователя.",
    createUser = "Ошибка при создании пользователя. Данный пользователь уже есть.",
    getToken = "Ошибка при получении токена.",
    authorization = "Неверно введены пароль или почта.",
    getUserAllWords = "Ошибка при получении всех слов пользователя.",
    createUserWord = "Ошибка при создании слова для пользователя.",
    updateUserWord = "Ошибка при обновлении слова для пользователя.",
    deleteUserWord = "Ошибка при удалении слова для пользователя.",
    getUserWord = "Ошибка при получении слова для пользователя.",
    getUserAggregatedWords = "Ошибка при получении, изучаемых слов для пользователя.",
    getUseStatistics = "Ошибка при получении статистики пользователя.",
    ulpdateUseStatistics = "Ошибка при обновлении статистики пользователя.",
    getUseSettings = "Ошибка при получении настроек пользователя.",
    ulpdateUseSettings = "Ошибка при обновлении настроек пользователя.",
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
    withCredentials?: true;
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

