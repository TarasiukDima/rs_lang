import React, { Dispatch, FC, useState } from "react";
import { connect } from "react-redux";
import { SPRINT_GAME_TIME } from "../../helpers/consts";
import ApiContextWrapper from "../../hoc/ApiContextWrapper";
import { changeAudioPlay } from "../../store/actions/actionsAudio";
import { IAudioGameProps } from "../../types/game";
import { IAction, IState } from "../../types/redux";
import Timer from "../timer";
import AudioGameBlock from "./AudioGameBlock";

import "./index.scss";

const AudioGame: FC<IAudioGameProps> = ({ serviceApi }: IAudioGameProps) => {
    const [points, setPoints] = useState(0);
    console.log(serviceApi);

    return (
        <>
        <div className="sprint__game_head">
            <Timer timeTimer={SPRINT_GAME_TIME} />

            <p className="total__poinst">
                Очки: <span>{points}</span>
            </p>
        </div>

        <AudioGameBlock />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ApiContextWrapper(AudioGame));
