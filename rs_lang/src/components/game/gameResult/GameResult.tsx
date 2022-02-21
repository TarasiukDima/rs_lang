import React, { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ResultList from "./ResultList";
import ButtonEl from "../../button";

import { saveSettingsLocalStorage } from "../../../helpers/utils";
import {
    LOCASTORAGE__USER_STATISTIC,
    PageLinks,
} from "../../../helpers/consts";
import { changeAllStatistic } from "../../../store/actions/actionsStatistic";

import { IGameResultProps } from "../../../types/game";
import {
    IAction,
    IState,
    IStatisticGameState,
    IStatisticInfoObjState,
} from "../../../types/redux";

import wonSound from "../../../assets/audio/won.mp3";

import "./index.scss";

const GameResult = ({
    points,
    needGame,
    wrongAnswers,
    currentAnswers,
    restartGame,
    serviceApi,
    playSong,

    countLearnedWords,
    maxLineCurrentAnswers,

    authorization,
    learnedWords,
    optional,

    updateAllStatistic,
}: IGameResultProps) => {
    const isAudioGame = needGame === "audio";

    const createOptionsStatisticObj = (
        objKey: IStatisticInfoObjState,
        needSavePoints: boolean
    ) => {
        const options: IStatisticInfoObjState = {
            wrongAnswers: wrongAnswers.length,
            correctAnswers: currentAnswers.length,
            longestSeries: maxLineCurrentAnswers,
            learnedWords: countLearnedWords,
        };

        if (needSavePoints) {
            options.points = points;
        }

        if (
            typeof objKey === "object" &&
            objKey !== null &&
            "wrongAnswers" in objKey &&
            "correctAnswers" in objKey
        ) {
            options.wrongAnswers = objKey.wrongAnswers + wrongAnswers.length;
            options.correctAnswers =
                objKey.correctAnswers + currentAnswers.length;
            options.learnedWords = objKey.learnedWords + countLearnedWords;
            options.longestSeries =
                maxLineCurrentAnswers > objKey.longestSeries
                    ? maxLineCurrentAnswers
                    : objKey.longestSeries;

            if (needSavePoints && objKey.points) {
                options.points =
                    points > objKey.points ? points : objKey.points;
            }
        }
        return options;
    };

    const updateStatistic = async () => {
        const newLearnedCount = learnedWords + countLearnedWords;
        const date = new Date();
        const keyWordStatistic = `${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()}`;

        const audioOptions = createOptionsStatisticObj(
            optional["gameStatistics"]["audio"],
            false
        );
        const sprintOptions = createOptionsStatisticObj(
            optional["gameStatistics"]["sprint"],
            true
        );
        const dayStatistic = createOptionsStatisticObj(
            optional["wordStatistics"][keyWordStatistic],
            false
        );
        const newStatistic = {
            learnedWords: newLearnedCount,
            optional: {
                wordStatistics: {
                    ...optional.wordStatistics,
                    [keyWordStatistic]: {
                        ...dayStatistic,
                    },
                },
                gameStatistics: {
                    ...optional.gameStatistics,
                },
            },
        };

        if (isAudioGame) {
            newStatistic.optional.gameStatistics.audio = audioOptions;
        } else {
            newStatistic.optional.gameStatistics.sprint = sprintOptions;
        }
        updateAllStatistic(newStatistic);
        saveSettingsLocalStorage(LOCASTORAGE__USER_STATISTIC, newStatistic);
        await serviceApi.updateUseStatistics(newStatistic);
    };

    useEffect(() => {
        if (authorization) {
            updateStatistic();
        }
    }, []);

    useEffect(() => {
        playSong(wonSound, true);
    }, []);

    return (
        <div className="game__result">
            <div className="buttons__wrap">
                <ButtonEl onclick={restartGame}>Повторить</ButtonEl>
                <Link to={PageLinks.gamesPage} className="button">
                    <span>К играм</span>
                </Link>
            </div>

            {currentAnswers.length > 0 && (
                <ResultList
                    title="Правильные ответы"
                    array={currentAnswers}
                    playSong={playSong}
                    classList="first__list"
                />
            )}
            {wrongAnswers.length > 0 && (
                <ResultList
                    title="Неправильные ответы"
                    array={wrongAnswers}
                    playSong={playSong}
                />
            )}
        </div>
    );
};

const mapStateToProps = ({
    user: { authorization },
    statistic: { learnedWords, optional },
}: IState) => ({
    authorization,
    learnedWords,
    optional,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        updateAllStatistic: (newState: IStatisticGameState) => {
            dispatch(changeAllStatistic(newState));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameResult);
