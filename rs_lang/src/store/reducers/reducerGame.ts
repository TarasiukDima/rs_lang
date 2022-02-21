import { IAction, IGameState } from "../../types/redux";
import { CHANGE_GAME_CATEGORY, CHANGE_GAME_ONE_PAGE, CHANGE_GAME_PAGE, CLEAR_GAME } from "../actions/actionsGame";

const INITIAL_STATE: IGameState = {
    gameOnePage: false,
    gameCategory: null,
    gamePage: null,
};

const reducerGame = (state: IGameState = INITIAL_STATE, action: IAction) => {
    const { type, payload } = action;

    switch (type) {
        case CLEAR_GAME:
            return {
                ...state,
                gameOnePage: false,
                gameCategory: null,
                gamePage: null,
            };
        case CHANGE_GAME_CATEGORY:
            return {
                ...state,
                gameCategory: payload as null | number,
            };
        case CHANGE_GAME_PAGE:
            return {
                ...state,
                gamePage: payload as null | number,
            };
        case CHANGE_GAME_ONE_PAGE:
            return {
                ...state,
                gameOnePage: payload as boolean,
            };

        default:
            return state;
    }
};

export default reducerGame;
