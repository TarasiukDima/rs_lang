import { TSimpleActionFC } from "../../types/common";
import { IChangeUserObject } from "../../types/form";

export const CHANGE_AUTHORIZATION = "CHANGE_AUTHORIZATION";
export const CHANGE_USER_TOKEN = "CHANGE_USER_TOKEN";
export const CHANGE_USER_REFRESHTOKEN = "CHANGE_USER_REFRESHTOKEN";
export const CHANGE_USER_ID = "CHANGE_USER_ID";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";

export const changeAuthorization: TSimpleActionFC<boolean> = (authorization: boolean) => {
    return {
        type: CHANGE_AUTHORIZATION,
        payload: authorization
    };
}

export const changeToken: TSimpleActionFC<string> = (newToken: string) => {
    return {
        type: CHANGE_USER_TOKEN,
        payload: newToken
    };
}

export const changeId: TSimpleActionFC<string> = (newId: string) => {
    return {
        type: CHANGE_USER_ID,
        payload: newId
    };
}

export const changeName: TSimpleActionFC<string> = (newName: string) => {
    return {
        type: CHANGE_USER_NAME,
        payload: newName
    };
}

export const changeUserInformation = (newUserObj: IChangeUserObject) => {
    return {
        type: CHANGE_USER_INFO,
        payload: newUserObj
    };
}

export const changeUserToken = (newToken: string) => {
    return {
        type: CHANGE_USER_REFRESHTOKEN,
        payload: newToken
    };
}

