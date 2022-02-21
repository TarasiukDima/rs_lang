import { LOCASTORAGE__NAME_USER } from "../../helpers/consts";
import { USER_LOCAL_KEYS } from "../../helpers/settings";
import { checkSettingsLocalStorage } from "../../helpers/utils";
import { IChangeUserObject, ILocalStoragUser } from "../../types/form";
import { IAction, IWordCountInfo, IUserState, IWordAddInfo, IWordUpdateInfo } from "../../types/redux";
import {
    ADD_USER_DIFFICULT,
    ADD_USER_LEARNED,
    ADD_USER_WORD,
    CHANGE_AUTHORIZATION,
    CHANGE_USER_ID,
    CHANGE_USER_INFO,
    CHANGE_USER_NAME,
    CHANGE_USER_REFRESHTOKEN,
    CHANGE_USER_TOKEN,
    CHANGE_USER_WORD_CURRENT_ANSWER_COUNT,
    CHANGE_USER_WORD_GAME,
    CHANGE_USER_WORD_WRNONG_ANSWER_COUNT,
    CLEAR_AUTHORIZATION,
    REMOVE_USER_DIFFICULT,
    REMOVE_USER_LEARNED,
    UPDATE_USER_WORD,
} from "../actions/actionsUser";

const INITIAL_STATE = (): IUserState => {
    const startState = {
        id: "",
        name: "",
        token: "",
        refreshToken: "",
        authorization: false,
        wordsSettings: {},
        time: 0,
        countNewWords: 0,
    };

    const answer = checkSettingsLocalStorage(
        LOCASTORAGE__NAME_USER,
        USER_LOCAL_KEYS
    ) as ILocalStoragUser;

    console.log(answer);

    if (answer) {
        return {
            id: answer.id,
            name: answer.name,
            token: answer.token,
            refreshToken: answer.refreshToken,
            authorization: answer.authorization,
            wordsSettings: answer.wordsSettings,
            time: answer.time || 0,
            countNewWords: answer.countNewWords || 0,
        };
    }

    return startState;
};

const reducerUser = (state: IUserState = INITIAL_STATE(), action: IAction) => {
    const { type, payload } = action;

    switch (type) {
        case CLEAR_AUTHORIZATION:
            return {
                ...state,
                id: "",
                name: "",
                token: "",
                refreshToken: "",
                authorization: false,
                wordsSettings: {},
                time: 0,
                countNewWords: 0,
            };

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
            const { id, name, token, time, refreshToken, authorization, wordsSettings, countNewWords } =
                payload as IChangeUserObject;
            return {
                ...state,
                id: id,
                name: name,
                token: token,
                refreshToken: refreshToken,
                authorization: authorization,
                wordsSettings: wordsSettings,
                time: time,
                countNewWords: countNewWords,
            };

        case ADD_USER_WORD:
            const { idWord: newWordId, wordOptions: options} = payload as IWordAddInfo;
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [newWordId]: {
                        ...options
                    },
                },
            };

        case UPDATE_USER_WORD:
            const { idWord: wordIdupDate, wordOptions: optionsUpdate} = payload as IWordUpdateInfo;
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [wordIdupDate]: {
                        ...state.wordsSettings[wordIdupDate],
                        ...optionsUpdate
                    },
                },
            };

        case ADD_USER_LEARNED:
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [payload as string]: {
                        ...state.wordsSettings[payload as string],
                        difficult: state.wordsSettings[payload as string]
                            ? state.wordsSettings[payload as string].difficult
                            : false,
                        learned: true,
                        countCurrentAnswer: 0,
                        countWrongAnswer: 0,
                    },
                },
            };

        case REMOVE_USER_LEARNED:
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [payload as string]: {
                        ...state.wordsSettings[payload as string],
                        difficult: state.wordsSettings[payload as string]
                            ? state.wordsSettings[payload as string].difficult
                            : false,
                        learned: false,
                        countCurrentAnswer: 0,
                        countWrongAnswer: 0,
                    },
                },
            };

        case ADD_USER_DIFFICULT:
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [payload as string]: {
                        ...state.wordsSettings[payload as string],
                        difficult: true,
                        learned: state.wordsSettings[payload as string]
                            ? state.wordsSettings[payload as string].learned
                            : false,
                        countCurrentAnswer: 0,
                        countWrongAnswer: 0,

                    },
                },
            };

        case REMOVE_USER_DIFFICULT:
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [payload as string]: {
                        ...state.wordsSettings[payload as string],
                        difficult: false,
                        learned: state.wordsSettings[payload as string]
                            ? state.wordsSettings[payload as string].learned
                            : false,
                        countCurrentAnswer: 0,
                        countWrongAnswer: 0,
                    },
                },
            };

        case CHANGE_USER_WORD_CURRENT_ANSWER_COUNT:
            const { idWord, count } = payload as IWordCountInfo;
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [idWord]: {
                        ...state.wordsSettings[idWord],
                        countCurrentAnswer: count,
                    },
                },
            };

        case CHANGE_USER_WORD_WRNONG_ANSWER_COUNT:
            const { idWord: idWordWrong, count: countWrong } = payload as IWordCountInfo;
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [idWordWrong]: {
                        ...state.wordsSettings[idWordWrong],
                        countWrongAnswer: countWrong,
                    },
                },
            };

        case CHANGE_USER_WORD_GAME:
            return {
                ...state,
                wordsSettings: {
                    ...state.wordsSettings,
                    [payload as string]: {
                        ...state.wordsSettings[payload as string],
                        game: true,
                    },
                },
            };

        default:
            return state;
    }
};

export default reducerUser;
