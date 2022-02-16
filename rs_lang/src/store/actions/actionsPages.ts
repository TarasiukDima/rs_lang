import { TSimpleActionFC } from "../../types/common";
import { IAction } from "../../types/redux";

export const CHANGE_VOCABULARY_CATEGORY = "CHANGE_VOCABULARY_CATEGORY";
export const CHANGE_VOCABULARY_PAGE = "CHANGE_VOCABULARY_PAGE";
export const CHANGE_HIDDEN_TAB_WORDS = "CHANGE_HIDDEN_TAB_WORDS";
export const CHANGE_STATISTIC_TAB = "CHANGE_STATISTIC_TAB";

export const changeVocabularyCategory: TSimpleActionFC<number> = (
    id: number
): IAction => {
    return {
        type: CHANGE_VOCABULARY_CATEGORY,
        payload: id,
    };
};
export const changeVocabularyPage: TSimpleActionFC<number> = (
    id: number
): IAction => {
    return {
        type: CHANGE_VOCABULARY_PAGE,
        payload: id,
    };
};

export const changeHiddenTabName: TSimpleActionFC<number> = (
    id: number
): IAction => {
    return {
        type: CHANGE_HIDDEN_TAB_WORDS,
        payload: id,
    };
};

export const changeStatisticTab: TSimpleActionFC<number> = (
    id: number
): IAction => {
    return {
        type: CHANGE_STATISTIC_TAB,
        payload: id,
    };
};
