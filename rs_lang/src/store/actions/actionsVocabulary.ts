import { TSimpleActionFC } from "../../types/common";
import { IAction } from "../../types/redux";

export const CHANGE_VOCABULARY_CATEGORY = "CHANGE_VOCABULARY_CATEGORY";
export const CHANGE_VOCABULARY_PAGE = "CHANGE_VOCABULARY_PAGE";

export const changeVocabularyCategory: TSimpleActionFC<number> = (
    numberTab: number
): IAction => {
    return {
        type: CHANGE_VOCABULARY_CATEGORY,
        payload: numberTab,
    };
};
export const changeVocabularyPage: TSimpleActionFC<number> = (
    numberPage: number
): IAction => {
    return {
        type: CHANGE_VOCABULARY_PAGE,
        payload: numberPage,
    };
};
