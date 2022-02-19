import { TSimpleActionFC } from "../../types/common";
import { IAction } from "../../types/redux";

export const CHANGE_GAME_CATEGORY = "CHANGE_GAME_CATEGORY";
export const CHANGE_GAME_PAGE = "CHANGE_GAME_PAGE";

export const changeGameCategory: TSimpleActionFC<null | number> = (
    num: null | number
): IAction => {
    return {
        type: CHANGE_GAME_CATEGORY,
        payload: num,
    };
};

export const changeGamePage: TSimpleActionFC<null | number> = (
    num: null | number
): IAction => {
    return {
        type: CHANGE_GAME_PAGE,
        payload: num,
    };
};
