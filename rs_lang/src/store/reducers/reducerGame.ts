import { IAction, IGameState } from "../../types/redux";
import { CHANGE_GAME_CATEGORY, CHANGE_GAME_PAGE } from "../actions/actionsGame";

const INITIAL_STATE: IGameState = {
    game: false,
    gameCategory: null,
    gamePage: null,
};

const reducerGame = (state: IGameState = INITIAL_STATE, action: IAction) => {
    const { type, payload } = action;

    switch (type) {
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

        default:
            return state;
    }
};

export default reducerGame;
