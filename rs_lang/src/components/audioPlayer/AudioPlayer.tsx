import React, { Dispatch, FC, RefObject, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { changeAudioPlay } from "../../store/actions/actionsAudio";
import { IAudioPlayerProps } from "../../types/game";
import { IAction, IState } from "../../types/redux";

import "./index.scss";


const AudioPlayer: FC<IAudioPlayerProps> = ({
    audioSrc,
    playAudio,
    changeCategory,
}: IAudioPlayerProps) => {
    const audioRef = useRef() as RefObject<HTMLAudioElement>;

    useEffect(() => {
        startPlay();
        return () => changeCategory(false);
    }, [playAudio]);

    const endPlay = () => {
        changeCategory(false);
    };

    const startPlay = () => {
        const { current: player } = audioRef;

        if (player && playAudio) {
            (player as HTMLAudioElement).play();
        }
    };

    return (
        <audio
            className="audio__page"
            src={audioSrc}
            ref={audioRef}
            onCanPlay={() => startPlay()}
            onEnded={() => endPlay()}
        />
    );
};

const mapStateToProps = ({ audio: { audioSrc, playAudio } }: IState) => ({
    audioSrc,
    playAudio,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeCategory: (play: boolean) => {
            dispatch(changeAudioPlay(play));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
