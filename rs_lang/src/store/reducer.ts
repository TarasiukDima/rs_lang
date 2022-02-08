import { IAction, IState } from "../types/redux";
import {
    CHANGE_AUDIO_PLAY,
    CHANGE_AUDIO_SRC,
    CHANGE_VOCABULARY_CATEGORY,
    CHANGE_VOCABULARY_PAGE,
} from "./actions";

const INITIAL_STATE: IState = {
    vocabularyCategory: 0,
    vocabularyPage: 0,
    audioSrc: "",
    playAudio: false,
};

const reducer = (state: IState = INITIAL_STATE, action: IAction) => {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_VOCABULARY_CATEGORY:
            return {
                ...state,
                vocabularyCategory: payload as number,
                vocabularyPage: 0,
            };
        case CHANGE_VOCABULARY_PAGE:
            return {
                ...state,
                vocabularyPage: payload as number,
            };
        case CHANGE_AUDIO_SRC:
            if (!payload) return state;
            return {
                ...state,
                audioSrc: payload as string,
            };
        case CHANGE_AUDIO_PLAY:
            if (!payload && payload !== false) return state;
            return {
                ...state,
                playAudio: payload as boolean,
            };

        default:
            return state;
    }
};

export default reducer;
