import { URL_DATA_FILES } from "../helpers/settings";
import { IAction, TChangeNumberFucntion } from "../types/redux";

export const CHANGE_VOCABULARY_CATEGORY = "CHANGE_VOCABULARY_CATEGORY";
export const CHANGE_VOCABULARY_PAGE = "CHANGE_VOCABULARY_PAGE";
export const CHANGE_AUDIO_SRC = "CHANGE_AUDIO_SRC";
export const CHANGE_AUDIO_PLAY = "CHANGE_AUDIO_PLAY";
export const CHANGE_AUDIO_VOCABULARY_NUMBER = "CHANGE_AUDIO_VOCABULARY_NUMBER";



export const changeVocabularyCategory: TChangeNumberFucntion = (numberTab: number): IAction => {
    return {
        type: CHANGE_VOCABULARY_CATEGORY,
        payload: numberTab
    };
}
export const changeVocabularyPage: TChangeNumberFucntion = (numberPage: number): IAction => {
    return {
        type: CHANGE_VOCABULARY_PAGE,
        payload: numberPage
    };
}

export const changeAudioSrc = (song: string): IAction => {
    return {
        type: CHANGE_AUDIO_SRC,
        payload: URL_DATA_FILES + song
    };
}
export const changeAudioPlay = (play: boolean): IAction => {
    return {
        type: CHANGE_AUDIO_PLAY,
        payload: play
    };
}

