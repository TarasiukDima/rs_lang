import { LOCASTORAGE__USER_STATISTIC } from "../../helpers/consts";
import {
    IAction,
    IStatisticGameState,
    IStatisticInfoObjState,
    IWordStatisticUpdate,
} from "../../types/redux";
import {
    CHANGE_COUNT_ALL_LEARNED_WORDS,
    CHANGE_COUNT_ALL_STATISTIC,
    UPDATE_AUDIO_GAME_STATISTIC,
    UPDATE_SPRINT_GAME_STATISTIC,
    UPDATE_WORD_STATISTIC,
} from "../actions/actionsStatistic";

const INITIAL_STATE = (): IStatisticGameState => {
    const localInfo = localStorage.getItem(LOCASTORAGE__USER_STATISTIC) || "";

    const startState = {
        learnedWords: 0,
        optional: {
            wordStatistics: {},
            gameStatistics: {
                sprint: {
                    wrongAnswers: 0,
                    correctAnswers: 0,
                    longestSeries: 0,
                    learnedWords: 0,
                    points: 0,
                },
                audio: {
                    wrongAnswers: 0,
                    correctAnswers: 0,
                    longestSeries: 0,
                    learnedWords: 0,
                },
            },
        },
    };

    if(!localInfo) return startState;
    const objLocal = JSON.parse(localInfo);

    if (typeof objLocal === 'object') {
        if (objLocal.learnedWords) {
            startState.learnedWords = objLocal.learnedWords;
        }
        if (objLocal.optional.wordStatistics) {
            startState.optional.wordStatistics = objLocal.optional.wordStatistics;
        }
        if (objLocal.optional.gameStatistics) {
            startState.optional.gameStatistics = objLocal.optional.gameStatistics;
        }
    }

    return startState;
};

const reducerStatistic = (
    state: IStatisticGameState = INITIAL_STATE(),
    action: IAction
) => {
    const { type, payload } = action;

    const newState = {
        ...state,
        optional: {
            ...state.optional,
            wordStatistics: {
                ...state.optional.wordStatistics,
            },
            gameStatistics: {
                ...state.optional.gameStatistics,
                sprint: {
                    ...state.optional.gameStatistics.sprint,
                },
                audio: {
                    ...state.optional.gameStatistics.audio,
                },
            },
        },
    };

    switch (type) {
        case CHANGE_COUNT_ALL_STATISTIC:
            return payload as IStatisticGameState;

        case CHANGE_COUNT_ALL_LEARNED_WORDS:
            newState.learnedWords = payload as number;
            return {
                ...newState
            };

        case UPDATE_WORD_STATISTIC:
            const { date, options } = payload as IWordStatisticUpdate;
            console.log("newState", newState, "options", options);
            if (newState.optional.wordStatistics[date]) {
                newState.optional.wordStatistics[date] = {
                    ...newState.optional.wordStatistics[date],
                    ...options,
                };
            } else {
                newState.optional.wordStatistics[date] = {
                    ...options,
                };
            }
            return newState;

        case UPDATE_SPRINT_GAME_STATISTIC:
            newState.optional.gameStatistics.sprint = {
                ...state.optional.gameStatistics.sprint,
                ...(payload as IStatisticInfoObjState),
            };

            return newState;

        case UPDATE_AUDIO_GAME_STATISTIC:
            newState.optional.gameStatistics.audio = {
                ...state.optional.gameStatistics.audio,
                ...(payload as IStatisticInfoObjState),
            };

            return newState;

        default:
            return state;
    }
};

export default reducerStatistic;
