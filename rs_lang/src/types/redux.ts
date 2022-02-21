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
        | IWordStatisticUpdate
        | IStatisticInfoObjState
        | IStatisticGameState;
}

export interface IWordStatisticUpdate {
    date: string;
    options: IStatisticInfoObjState;
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

export interface IStatisticInfoObjState {
    wrongAnswers: number;
    correctAnswers: number;
    longestSeries: number;
    learnedWords: number;
    points?: number;
}
export interface IStatisticOptional {
    wordStatistics: {
        [key: string]: IStatisticInfoObjState;
    };
    gameStatistics: {
        sprint: IStatisticInfoObjState;
        audio: IStatisticInfoObjState;
    };
}

export interface IStatisticGameState {
    learnedWords: number;
    optional: IStatisticOptional;
}

export interface IState {
    game: IGameState;
    user: IUserState;
    audio: IAudioState;
    pages: IPagesState;
    statistic: IStatisticGameState;
}
