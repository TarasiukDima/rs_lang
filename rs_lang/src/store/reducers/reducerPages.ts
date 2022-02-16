import {
    LOCASTORAGE__STATISTIC_PAG,
    LOCASTORAGE__VOC_CAT,
    LOCASTORAGE__VOC_HIDDEN_TAB,
    LOCASTORAGE__VOC_PAG,
} from "../../helpers/consts";
import { IAction, IPagesState } from "../../types/redux";
import {
    CHANGE_HIDDEN_TAB_WORDS,
    CHANGE_STATISTIC_TAB,
    CHANGE_VOCABULARY_CATEGORY,
    CHANGE_VOCABULARY_PAGE,
} from "../actions/actionsPages";

const INITIAL_STATE = (): IPagesState => {
    console.log(localStorage.getItem(LOCASTORAGE__VOC_CAT));

    const category = Number(localStorage.getItem(LOCASTORAGE__VOC_CAT)) || 0;
    const page = Number(localStorage.getItem(LOCASTORAGE__VOC_PAG)) || 0;
    const hiddenTab =
        Number(localStorage.getItem(LOCASTORAGE__VOC_HIDDEN_TAB)) || 0;
    const statistic =
        Number(localStorage.getItem(LOCASTORAGE__STATISTIC_PAG)) || 0;
    return {
        vocabularyCategory: category,
        vocabularyPage: page,
        vocabularyHiddenTab: hiddenTab,
        statisticTab: statistic,
    };
};

const reducerPages = (
    state: IPagesState = INITIAL_STATE(),
    action: IAction
) => {
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
        case CHANGE_STATISTIC_TAB:
            return {
                ...state,
                statisticTab: payload as number,
            };
        case CHANGE_HIDDEN_TAB_WORDS:
            return {
                ...state,
                vocabularyHiddenTab: payload as number,
            };

        default:
            return state;
    }
};

export default reducerPages;
