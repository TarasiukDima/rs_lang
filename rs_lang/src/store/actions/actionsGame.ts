import { TClearState, TSimpleActionFC } from "../../types/common";
import { IAction } from "../../types/redux";

export const CLEAR_GAME = "CLEAR_GAME";
export const CHANGE_GAME_CATEGORY = "CHANGE_GAME_CATEGORY";
export const CHANGE_GAME_PAGE = "CHANGE_GAME_PAGE";
export const CHANGE_GAME_ONE_PAGE = "CHANGE_GAME_ONE_PAGE";

export const clearGameState: TClearState = (): IAction => {
    return {
        type: CLEAR_GAME,
        payload: null,
    };
};

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

export const changeVarientGamePage: TSimpleActionFC<boolean> = (
    num: boolean
): IAction => {
    return {
        type: CHANGE_GAME_ONE_PAGE,
        payload: num,
    };
};
