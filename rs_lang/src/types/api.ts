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
    updateUseSettings = "Ошибка при обновлении настроек пользователя.",
}

export enum ApiUrls {
    words = "words",
    createUser = "users",
    signInUser = "signin",
    tokens = "tokens",
    aggregatedWords = "aggregatedWords",
    statistics = "statistics",
    settings = "settings",
}

export type TOptionsMethods = "GET" | "POST" | "DELETE" | "PUT";

export interface IHeaders {
    [key: string]: string;
}

export interface IApiOptions {
    method?: TOptionsMethods;
    headers?: IHeaders;
    body?: string;
    withCredentials?: true;
}

export interface IApiUserInfo {
    token: string;
    userId: string;
    refreshToken: string;
    time?: number;
}

export interface IUserLogInForm {
    email: string;
    password: string;
}

export interface IUserCreateForm extends IUserLogInForm {
    name: string;
}

export interface IApiWordsObj {
    data: Array<IWordItemObj>;
    errorText: null | string;
}

export interface IApiGameWordsObj {
    data: Array<Array<IWordItemObj>>;
    errorText: null | string;
}

export interface IWordOptionObj {
    learned: boolean;
    difficult: boolean;
}

export interface IUserWordOptionObj {
    userId: string;
    wordId: string;
    token: string;
}

export interface ICreateUserWord extends IUserWordOptionObj {
    wordOptions: IWordOptionObj;
}

export interface ISettingsData {
    wordsPerDay: number;
    optional: {};
}
