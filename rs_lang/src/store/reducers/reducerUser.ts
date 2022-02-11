import { IChangeUserObject } from "../../types/form";
import { IAction, IUserState } from "../../types/redux";
import {
    CHANGE_AUTHORIZATION,
    CHANGE_USER_ID,
    CHANGE_USER_INFO,
    CHANGE_USER_NAME,
    CHANGE_USER_TOKEN,
} from "../actions/actionsUser";

const INITIAL_STATE: IUserState = {
    id: "",
    name: "",
    token: "",
    authorization: false,
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

        case CHANGE_USER_NAME:
            return {
                ...state,
                name: payload as string,
            };

        case CHANGE_USER_INFO:
            const { id, name, token, authorization } = payload as IChangeUserObject;
            return {
                ...state,
                id: id,
                name: name,
                token: token,
                authorization: authorization,
            };

        default:
            return state;
    }
};

export default reducerUser;
