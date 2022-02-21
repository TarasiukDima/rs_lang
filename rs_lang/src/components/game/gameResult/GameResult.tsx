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
    ISTATDayFields,
    IState,
    ISTATGameFields,
    IStatisticGameState,
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

    countNewWords,
    countLearnedWords,
    maxLineCurrentAnswers,

    authorization,
    learnedWords,
    optional,

    updateAllStatistic,
}: IGameResultProps) => {
    const isAudioGame = needGame === "audio";
    const date = new Date();
    const keyWordStatistic = `${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()}`;

    const createGameOptionsObj = (
        objKey: ISTATGameFields,
        needSavePoints: boolean,
    ): ISTATGameFields => {
        const options: ISTATGameFields = {
            wrongAnswers: wrongAnswers.length,
            correctAnswers: currentAnswers.length,
            longestSeries: maxLineCurrentAnswers,
            learnedWords: countLearnedWords,
            countNewWords: countNewWords,
            lastDate: keyWordStatistic,
        };

        if (
            typeof objKey === "object" &&
            objKey !== null &&
            "wrongAnswers" in objKey &&
            "correctAnswers" in objKey &&
            objKey.lastDate === keyWordStatistic
        ) {
            options.wrongAnswers = objKey.wrongAnswers + wrongAnswers.length;
            options.correctAnswers =
                objKey.correctAnswers + currentAnswers.length;
            options.longestSeries =
                maxLineCurrentAnswers > objKey.longestSeries
                    ? maxLineCurrentAnswers
                    : objKey.longestSeries;

            options.countNewWords = objKey.countNewWords + countNewWords;
            options.learnedWords = objKey.learnedWords + countLearnedWords;
        }

        if (needSavePoints) {
            const oldPoints = objKey.points || 0;

            if (objKey.lastDate === keyWordStatistic) {
                options.points =
                    points > oldPoints ? points : oldPoints;
            } else {
                options.points = oldPoints;
            }
        }

        return options;
    };

    const createDayOptionsObj = (
        objKey: ISTATDayFields
    ):  ISTATDayFields => {
        const options: ISTATDayFields = {
            wrongAnswers: wrongAnswers.length,
            correctAnswers: currentAnswers.length,
            longestSeries: maxLineCurrentAnswers,
            learnedWords: countLearnedWords,
            countNewWords: countNewWords,
        };

        if (
            typeof objKey === "object" &&
            objKey !== null &&
            "countNewWords" in objKey
        ) {
            console.log(objKey.learnedWords);

            options.wrongAnswers = objKey.wrongAnswers + wrongAnswers.length;
            options.correctAnswers =
                objKey.correctAnswers + currentAnswers.length;
            options.learnedWords = objKey.learnedWords + countLearnedWords;
            options.longestSeries =
                maxLineCurrentAnswers > objKey.longestSeries
                    ? maxLineCurrentAnswers
                    : objKey.longestSeries;
            options.countNewWords = objKey.countNewWords + countNewWords;
        }
        console.log('fasle');

        return options;
    };

    const updateStatistic = async () => {
        const newLearnedCount = learnedWords + countLearnedWords;

        const audioOptions = createGameOptionsObj(
            optional["gameStatistics"]["audio"],
            false
        );
        const sprintOptions = createGameOptionsObj(
            optional["gameStatistics"]["sprint"],
            true
        );
        const dayStatistic = createDayOptionsObj(
            optional["wordStatistics"][keyWordStatistic]
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
