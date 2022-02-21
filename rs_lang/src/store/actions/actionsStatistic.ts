import { TActionFC, TSimpleActionFC } from "../../types/common";
import { IAction, IStatisticGameState, IStatisticInfoObjState } from "../../types/redux";

export const CHANGE_COUNT_ALL_STATISTIC = "CHANGE_COUNT_ALL_STATISTIC";
export const CHANGE_COUNT_ALL_LEARNED_WORDS = "CHANGE_COUNT_ALL_LEARNED_WORDS";
export const UPDATE_WORD_STATISTIC = "UPDATE_WORD_STATISTIC";
export const UPDATE_SPRINT_GAME_STATISTIC = "UPDATE_SPRINT_GAME_STATISTIC";
export const UPDATE_AUDIO_GAME_STATISTIC = "UPDATE_AUDIO_GAME_STATISTIC";

export const changeAllStatistic: TSimpleActionFC<IStatisticGameState> = (
    newState: IStatisticGameState
): IAction => {
    return {
        type: CHANGE_COUNT_ALL_STATISTIC,
        payload: newState,
    };
};

export const changeAllLearnedWords: TSimpleActionFC<number> = (
    count: number
): IAction => {
    return {
        type: CHANGE_COUNT_ALL_LEARNED_WORDS,
        payload: count,
    };
};

export const updateAllWordStatistic: TActionFC<string, IStatisticInfoObjState> = (
    date: string, options: IStatisticInfoObjState
): IAction => {
    return {
        type: UPDATE_WORD_STATISTIC,
        payload: {
            date, options
        },
    };
};

export const updateSprintGameStatistic: TSimpleActionFC<IStatisticInfoObjState> = (
    options: IStatisticInfoObjState
): IAction => {
    return {
        type: UPDATE_SPRINT_GAME_STATISTIC,
        payload: options,
    };
};

export const updateAudioGameStatistic: TSimpleActionFC<IStatisticInfoObjState> = (
    options: IStatisticInfoObjState
): IAction => {
    return {
        type: UPDATE_AUDIO_GAME_STATISTIC,
        payload: options,
    };
};
