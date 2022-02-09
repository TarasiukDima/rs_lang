import { IAction, IAudioState } from "../../types/redux";
import { CHANGE_AUDIO_PLAY, CHANGE_AUDIO_SRC } from "../actions/actionsAudio";

const INITIAL_STATE: IAudioState = {
    audioSrc: "",
    playAudio: false,
};

const reducerAudio = (state: IAudioState = INITIAL_STATE, action: IAction) => {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_AUDIO_SRC:
            return {
                ...state,
                audioSrc: payload as string,
            };
        case CHANGE_AUDIO_PLAY:
            return {
                ...state,
                playAudio: payload as boolean,
            };

        default:
            return state;
    }
};

export default reducerAudio;
