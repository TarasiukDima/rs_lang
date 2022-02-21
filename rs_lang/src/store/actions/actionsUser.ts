import { TActionFC, TSimpleActionFC } from "../../types/common";
import { IChangeUserObject } from "../../types/form";
import { IUserWordKeys, IUserWordsInformation } from "../../types/redux";

export const CHANGE_AUTHORIZATION = "CHANGE_AUTHORIZATION";
export const CHANGE_USER_TOKEN = "CHANGE_USER_TOKEN";
export const CHANGE_USER_REFRESHTOKEN = "CHANGE_USER_REFRESHTOKEN";
export const CHANGE_USER_ID = "CHANGE_USER_ID";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";

export const ADD_USER_WORD = "ADD_USER_WORD";
export const UPDATE_USER_WORD = "UPDATE_USER_WORD";
export const ADD_USER_LEARNED = "ADD_USER_LEARNED";
export const REMOVE_USER_LEARNED = "REMOVE_USER_LEARNED";
export const ADD_USER_DIFFICULT = "ADD_USER_DIFFICULT";
export const REMOVE_USER_DIFFICULT = "REMOVE_USER_DIFFICULT";
export const CHANGE_USER_WORD_CURRENT_ANSWER_COUNT = "CHANGE_USER_WORD_CURRENT_ANSWER_COUNT";
export const CHANGE_USER_WORD_WRNONG_ANSWER_COUNT = "CHANGE_USER_WORD_WRNONG_ANSWER_COUNT";
export const CHANGE_USER_WORD_GAME = "CHANGE_USER_WORD_GAME";

export const changeAuthorization: TSimpleActionFC<boolean> = (
    authorization: boolean
) => {
    return {
        type: CHANGE_AUTHORIZATION,
        payload: authorization,
    };
};

export const changeToken: TSimpleActionFC<string> = (newToken: string) => {
    return {
        type: CHANGE_USER_TOKEN,
        payload: newToken,
    };
};

export const changeRefreshToken: TSimpleActionFC<string> = (newToken: string) => {
    return {
        type: CHANGE_USER_REFRESHTOKEN,
        payload: newToken,
    };
};

export const changeId: TSimpleActionFC<string> = (newId: string) => {
    return {
        type: CHANGE_USER_ID,
        payload: newId,
    };
};

export const changeName: TSimpleActionFC<string> = (newName: string) => {
    return {
        type: CHANGE_USER_NAME,
        payload: newName,
    };
};

export const changeUserInformation: TSimpleActionFC<IChangeUserObject> = (
    newUserObj: IChangeUserObject
) => {
    return {
        type: CHANGE_USER_INFO,
        payload: newUserObj,
    };
};

export const addUserWord: TActionFC<string, IUserWordKeys> = (idWord: string, wordOptions: IUserWordKeys) => {
    return {
        type: ADD_USER_WORD,
        payload: {
            idWord,
            wordOptions,
        },
    };
};

export const updateUserWord: TActionFC<string, Partial<IUserWordKeys>> = (idWord: string, wordOptions: Partial<IUserWordKeys>) => {
    return {
        type: UPDATE_USER_WORD,
        payload: {
            idWord,
            wordOptions,
        },
    };
};

export const addUserLearnedWord: TSimpleActionFC<string> = (idWord: string) => {
    return {
        type: ADD_USER_LEARNED,
        payload: idWord,
    };
};

export const removeUserLearnedWord: TSimpleActionFC<string> = (
    idWord: string
) => {
    return {
        type: REMOVE_USER_LEARNED,
        payload: idWord,
    };
};

export const addUserDifficultWord: TSimpleActionFC<string> = (
    idWord: string
) => {
    return {
        type: ADD_USER_DIFFICULT,
        payload: idWord,
    };
};

export const removeUserDifficultWord: TSimpleActionFC<string> = (
    idWord: string
) => {
    return {
        type: REMOVE_USER_DIFFICULT,
        payload: idWord,
    };
};

export const changeCountCurrentAnswersWord: TActionFC<string, number> = (
    idWord: string, count: number
) => {
    return {
        type: CHANGE_USER_WORD_CURRENT_ANSWER_COUNT,
        payload: {
            idWord,
            count
        },
    };
};

export const changeCountWrongAnswersWord: TActionFC<string, number> = (
    idWord: string, count: number
) => {
    return {
        type: CHANGE_USER_WORD_WRNONG_ANSWER_COUNT,
        payload: {
            idWord,
            count
        },
    };
};

export const changeWordGameState: TSimpleActionFC<string> = (
    idWord: string
) => {
    return {
        type: CHANGE_USER_WORD_GAME,
        payload: idWord,
    };
};
