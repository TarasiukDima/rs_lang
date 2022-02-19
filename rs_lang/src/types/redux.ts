import { IChangeUserObject } from "./form";

export interface IAction {
    type: string;
    payload: number | string | boolean | IChangeUserObject | null;
}

export interface IAudioState {
    audioSrc: string;
    playAudio: boolean;
}

export interface IGameState {
    game: boolean;
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
    [key: string]: {
        learned: boolean;
        difficult: boolean;
    };
}

export interface IUserState {
    id: string;
    name: string;
    token: string;
    refreshToken: string;
    authorization: boolean;
    wordsSettings: IUserWordsInformation;
    time: number;
}

export interface IState {
    game: IGameState;
    user: IUserState;
    audio: IAudioState;
    pages: IPagesState;
}
