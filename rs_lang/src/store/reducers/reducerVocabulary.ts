import { IAction, IVocabularyState } from "../../types/redux";
import { CHANGE_VOCABULARY_CATEGORY, CHANGE_VOCABULARY_PAGE } from "../actions/actionsVocabulary";


const INITIAL_STATE: IVocabularyState = {
    vocabularyCategory: 0,
    vocabularyPage: 0,
};


const reducerVocabulary = (state: IVocabularyState = INITIAL_STATE, action: IAction) => {
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

        default:
            return state;
    }
};

export default reducerVocabulary;
