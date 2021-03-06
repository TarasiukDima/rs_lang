import { URL_DATA_FILES } from "../../helpers/consts";
import { TClearState, TSimpleActionFC } from "../../types/common";
import { IAction } from "../../types/redux";

export const CLEAR_AUDIO = "CLEAR_AUDIO";
export const CHANGE_AUDIO_SRC = "CHANGE_AUDIO_SRC";
export const CHANGE_AUDIO_LOCAL_SRC = "CHANGE_AUDIO_LOCAL_SRC";
export const CHANGE_AUDIO_PLAY = "CHANGE_AUDIO_PLAY";

export const clearAudioState: TClearState = (): IAction => {
    return {
        type: CLEAR_AUDIO,
        payload: null,
    };
};

export const changeAudioSrc: TSimpleActionFC<string> = (
    song: string
): IAction => {
    return {
        type: CHANGE_AUDIO_SRC,
        payload: URL_DATA_FILES + song,
    };
};
export const changeAudioLocalSrc: TSimpleActionFC<string> = (
    song: string
): IAction => {
    return {
        type: CHANGE_AUDIO_LOCAL_SRC,
        payload: song,
    };
};

export const changeAudioPlay: TSimpleActionFC<boolean> = (
    play: boolean
): IAction => {
    return {
        type: CHANGE_AUDIO_PLAY,
        payload: play,
    };
};

