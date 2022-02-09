import { IAction, IUserState } from "../../types/redux";
import { CHANGE_AUTHORIZATION, CHANGE_USER_ID, CHANGE_USER_TOKEN } from "../actions/actionsUser";

const INITIAL_STATE: IUserState = {
    id: "",
    token: "",
    authorization: true,
};

const reducerUser = (state: IUserState = INITIAL_STATE, action: IAction) => {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_AUTHORIZATION:
            return {
                ...state,
                authorization: payload as boolean,
            };

        case CHANGE_USER_TOKEN:
            return {
                ...state,
                token: payload as string,
            };

        case CHANGE_USER_ID:
            return {
                ...state,
                id: payload as string,
            };

        default:
            return state;
    }
};

export default reducerUser;
