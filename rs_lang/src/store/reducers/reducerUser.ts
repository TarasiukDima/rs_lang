import { LOCASTORAGE__NAME_USER } from "../../helpers/consts";
import { checkSettingsLocalStorage } from "../../helpers/utils";
import { IChangeUserObject } from "../../types/form";
import { IAction, IUserState } from "../../types/redux";
import {
    CHANGE_AUTHORIZATION,
    CHANGE_USER_ID,
    CHANGE_USER_INFO,
    CHANGE_USER_NAME,
    CHANGE_USER_REFRESHTOKEN,
    CHANGE_USER_TOKEN,
} from "../actions/actionsUser";


const INITIAL_STATE = (): IUserState => {
    const startState = {
        id: "",
        name: "",
        token: "",
        refreshToken: "",
        authorization: false,
    }

    const userLocalKeys = [
        "name",
        "id",
        "token",
        "token",
        "refreshToken",
        "authorization",
        "time",
    ];

    const answer = checkSettingsLocalStorage(LOCASTORAGE__NAME_USER, userLocalKeys);
    if (answer) {
        return {
            id: answer.id,
            name: answer.name,
            token: answer.token,
            refreshToken: answer.refreshToken,
            authorization: answer.authorization,
        };
    }

    return startState;
};

const reducerUser = (state: IUserState = INITIAL_STATE(), action: IAction) => {
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

        case CHANGE_USER_REFRESHTOKEN:
            return {
                ...state,
                refreshToken: payload as string,
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
