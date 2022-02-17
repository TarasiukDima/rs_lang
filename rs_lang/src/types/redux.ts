import { IChangeUserObject } from "./form";

export interface IAction {
    type: string;
    payload: number | string | boolean | IChangeUserObject;
}

export interface IAudioState {
    audioSrc: string;
    playAudio: boolean;
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
    user: IUserState;
    audio: IAudioState;
    pages: IPagesState;
}
