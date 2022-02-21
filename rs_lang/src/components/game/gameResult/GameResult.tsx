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
    const keyWordStatistic = `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`;


    const createCoomonObj = (
        objKey: ISTATDayFields | ISTATGameFields,
    ): Omit<ISTATGameFields, "lastDate"> => {
        const options: Omit<ISTATGameFields, "lastDate"> = {
            wrongAnswers: wrongAnswers.length,
            correctAnswers: currentAnswers.length,
            longestSeries: maxLineCurrentAnswers,
            learnedWords: countLearnedWords,
            countNewWords: countNewWords,
        };

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
        }

        return options;
    };

    const createGameOptionsObj = (
        objKey: ISTATGameFields,
        needSavePoints: boolean,
    ): ISTATGameFields => {
        const options: ISTATGameFields = {
            ...createCoomonObj(objKey),
            lastDate: keyWordStatistic,
        };

        if (
            typeof objKey === "object" &&
            objKey !== null &&
            "wrongAnswers" in objKey &&
            "correctAnswers" in objKey
        ) {
            if (objKey.lastDate === keyWordStatistic) {
                options.countNewWords = objKey.countNewWords + countNewWords;
            }
        }

        if (needSavePoints) {
            const oldPoints = objKey.points || 0;
            options.points =
                points > oldPoints ? points : oldPoints;
        }

        return options;
    };

    const createDayOptionsObj = (
        objKey: ISTATDayFields
    ):  ISTATDayFields => {
        const options: ISTATDayFields = {
            ...createCoomonObj(objKey),
        };
        if (
            typeof objKey === "object" &&
            objKey !== null &&
            "countNewWords" in objKey
        ) {
            options.countNewWords =
                countNewWords > objKey.countNewWords ? countNewWords : objKey.countNewWords;
        }
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
