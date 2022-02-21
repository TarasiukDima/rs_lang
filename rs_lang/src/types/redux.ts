import { IChangeUserObject } from "./form";

export interface IAction {
    type: string;
    payload:
        | number
        | string
        | boolean
        | IChangeUserObject
        | null
        | IGameWordInfo
        | IUserWordsInformation
        | IWordCountInfo
        | IWordAddInfo
        | IWordUpdateInfo
        | ISTATChangeDayOptions
        | ISTATGameFields
        | IStatisticGameState;
}

export interface ISTATChangeDayOptions {
    date: string;
    options: ISTATDayFields;
}

export interface IWordCountInfo {
    idWord: string;
    count: number;
}

export interface IWordAddInfo {
    idWord: string;
    wordOptions: IUserWordKeys;
}
export interface IWordUpdateInfo {
    idWord: string;
    wordOptions: Partial<IUserWordKeys>;
}

export interface IGameWordInfo {
    wordSettings: IUserWordsInformation;
}

export interface IAudioState {
    audioSrc: string;
    playAudio: boolean;
}

export interface IGameState {
    gameOnePage: boolean;
    gameCategory: null | number;
    gamePage: null | number;
}

export interface IPagesState {
    vocabularyCategory: number;
    vocabularyPage: number;
    vocabularyHiddenTab: number;
    statisticTab: number;
}

export interface IUserWordsInformation {
    [key: string]: IUserWordKeys;
}

export interface IUserWordKeys {
    learned: boolean;
    difficult: boolean;
    countCurrentAnswer: number;
    countWrongAnswer: number;
    game: boolean;
}

export interface IUserState {
    id: string;
    name: string;
    token: string;
    refreshToken: string;
    authorization: boolean;
    wordsSettings: IUserWordsInformation;
    time: number;
    countNewWords: number;
}



export interface ISTATCommonOpt {
    wrongAnswers: number;
    correctAnswers: number;
    longestSeries: number;
    learnedWords: number;
}

export interface ISTATDayFields extends ISTATCommonOpt {
    countNewWords: number;
}

export interface ISTATGameFields extends ISTATDayFields {
    lastDate: string;
    points?: number;
}

export interface ISTATWords {
    [key: string]: ISTATDayFields;
}

export interface ISTATOptions {
    wordStatistics: ISTATWords;
    gameStatistics: {
        sprint: ISTATGameFields;
        audio: ISTATGameFields;
    };
}

export interface IStatisticGameState {
    learnedWords: number;
    optional: ISTATOptions;
}

export interface IState {
    game: IGameState;
    user: IUserState;
    audio: IAudioState;
    pages: IPagesState;
    statistic: IStatisticGameState;
}
