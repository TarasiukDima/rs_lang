import { IChangeUserObject } from "./form";

export interface IAction {
    type: string;
    payload: number | string | boolean | IChangeUserObject;
}

export interface IVocabularyState {
    vocabularyCategory: number;
    vocabularyPage: number;
}

export interface IAudioState {
    audioSrc: string;
    playAudio: boolean;
}

export interface IUserState {
    id: string;
    name: string;
    token: string;
    authorization: boolean;
}

export interface IState {
    user: IUserState,
    audio: IAudioState,
    vocabulary: IVocabularyState,
}


