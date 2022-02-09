export interface IAction {
    type: string;
    payload: number | string | boolean;
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
    token: string;
    authorization: boolean;
}

export interface IState {
    user: IUserState,
    audio: IAudioState,
    vocabulary: IVocabularyState,
}


