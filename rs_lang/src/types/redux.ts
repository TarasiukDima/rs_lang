export type TChangeNumberFucntion = (num: number) => IAction;

export interface IAction {
    type: string;
    payload: number | string | boolean;
}

export interface IState {
    vocabularyCategory: number;
    vocabularyPage: number;
    audioSrc: string;
    playAudio: boolean;
}
