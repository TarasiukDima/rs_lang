import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";

import GameResult from "../gameResult/GameResult";
import Question from "../quesion/Question";
import GameHeadBlock from "../gameHeadBlock/GameHeadBlock";
import ApiContextWrapper from "../../../hoc/ApiContextWrapper";

import { ANSWER_POINT, GAME_COUNT_ANSWERS_STAR } from "../../../helpers/consts";

import {
    addUserWord,
    updateUserWord,
} from "../../../store/actions/actionsUser";
import {
    changeAudioLocalSrc,
    changeAudioPlay,
    changeAudioSrc,
} from "../../../store/actions/actionsAudio";

import { TSimpleTypeFunction } from "../../../types/common";
import {
    IAnswerObj,
    IOneGameBodyProps,
    TSoundGameButton,
} from "../../../types/game";
import { IAction, IState, IUserWordKeys } from "../../../types/redux";

import currentSound from "../../../assets/audio/current.mp3";
import wrongSound from "../../../assets/audio/wrong.mp3";

import "./index.scss";

const GameBodyBlock = ({
    authorization,
    token,
    id,

    changeSrcSong,
    changePlay,

    serviceApi,
    data,
    needGame,
    wordsSettings,
    addWordInfo,
    updateWordGameState,
}: IOneGameBodyProps) => {
    const [points, setPoints] = useState(0);
    const [pointsCoefficient, setPointsCoefficient] = useState(1);
    const [countRightAnswer, setCountRightAnswer] = useState(0);
    const [maxCountRightAnswer, setMaxCountRightAnswer] = useState(0);
    const [timeOutGame, setTimeOutGame] = useState(false);
    const [countLearnedWords, setCountLearnedWords] = useState(0);
    const [countNewWords, setCountNewWords] = useState(0);

    const [loadingData, setLoadingData] = useState(true);
    const [answersChoices, setAnswersChoices] = useState([] as Array<string>);

    const [questionNumber, setQuestionNumber] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState([] as Array<IAnswerObj>);
    const [currentAnswers, setCurrentAnswers] = useState(
        [] as Array<IAnswerObj>
    );

    const isAudioGame = needGame === "audio";

    useEffect(() => {
        const newArr: Array<string> = [];
        data.forEach((el) => {
            newArr.push(el.wordTranslate);
        });
        setAnswersChoices(newArr);
        setLoadingData(false);
    }, []);

    const restartGame = () => {
        setQuestionNumber(0);
        setWrongAnswers([]);
        setCurrentAnswers([]);
        setTimeOutGame(false);
        setPointsCoefficient(1);
        setPoints(0);
        setCountRightAnswer(0);
        setMaxCountRightAnswer(0);
        setCountLearnedWords(0);
        setCountNewWords(0);
    };

    const playSong: TSoundGameButton = (audio: string, local: boolean) => {
        changeSrcSong(audio, local);
        changePlay(true);
    };

    const checkIsNewLearnedWord = (
        wordId: string,
        wordOptions: IUserWordKeys
    ) => {
        if (!(wordId in wordsSettings)) return;

        if (
            wordsSettings[wordId].learned === false &&
            wordOptions.learned === true &&
            wordOptions.countCurrentAnswer > 0
        ) {
            setCountLearnedWords((count) => count + 1);
        }
    };

    const updateWordInfo = async (
        goodAnswer: boolean,
        currentAnswerNumber: number,
        wrongAnswerNumber: number
    ) => {
        const wordId = data[questionNumber].id;
        const optionsObj = {
            userId: id,
            wordId: wordId,
            wordOptions: {
                learned: false,
                difficult: false,
                countCurrentAnswer: currentAnswerNumber,
                countWrongAnswer: wrongAnswerNumber,
                game: true,
            },
            token,
        };

        if (wordId in wordsSettings) {
            const countCurrentAnswer =
                wordsSettings[wordId].countCurrentAnswer +
                    currentAnswerNumber || currentAnswerNumber;
            const countWrongAnswer =
                wordsSettings[wordId].countWrongAnswer + wrongAnswerNumber ||
                wrongAnswerNumber;
            optionsObj.wordOptions.difficult = wordsSettings[wordId].difficult;

            if (!goodAnswer) {
                optionsObj.wordOptions.countCurrentAnswer = 0;
                optionsObj.wordOptions.countWrongAnswer = countWrongAnswer;

                if (countWrongAnswer >= 3) {
                    optionsObj.wordOptions.difficult = true;
                    optionsObj.wordOptions.learned = false;
                }
            } else {
                optionsObj.wordOptions.countWrongAnswer = 0;
                optionsObj.wordOptions.countCurrentAnswer = countCurrentAnswer;

                if (countCurrentAnswer >= 3) {
                    optionsObj.wordOptions.learned = true;
                    optionsObj.wordOptions.difficult = false;
                } else {
                    optionsObj.wordOptions.learned =
                        wordsSettings[wordId].learned;
                }
            }

            if (wordsSettings[wordId].game === false) {
                setCountNewWords((count) => count + 1);
            }

            checkIsNewLearnedWord(wordId, optionsObj.wordOptions);
            updateWordGameState(wordId, optionsObj.wordOptions);
            console.log(optionsObj);

            await serviceApi.updateUserWord(optionsObj);
            return;
        }

        setCountNewWords((count) => count + 1);

        checkIsNewLearnedWord(wordId, optionsObj.wordOptions);
        addWordInfo(wordId, optionsObj.wordOptions);
        await serviceApi.createUserWord(optionsObj);
    };

    const updateAnswerWord = async (goodAnswer: boolean) => {
        const currentAnswerNumber = goodAnswer ? 1 : 0;
        const wrongAnswerNumber = !goodAnswer ? 1 : 0;

        await updateWordInfo(
            goodAnswer,
            currentAnswerNumber,
            wrongAnswerNumber
        );
    };

    const updateCountAnswers = (newValue: number) => {
        setCountRightAnswer(newValue);

        if (newValue > maxCountRightAnswer) {
            setMaxCountRightAnswer(newValue);
        }
    };

    const updateComponentState = (resultAnswer: boolean) => {
        const { id, audio, word, wordTranslate } = data[questionNumber];
        const urlAnswer = resultAnswer ? currentSound : wrongSound;
        const answerQuetsionObj: IAnswerObj = {
            id: id,
            audio: audio,
            word: word,
            wordTranslate: wordTranslate,
            answer: resultAnswer,
        };

        if (resultAnswer) {
            updateCountAnswers(countRightAnswer + 1);

            if (countRightAnswer === GAME_COUNT_ANSWERS_STAR - 1) {
                setPointsCoefficient(2);
            }
            if (countRightAnswer === 2 * GAME_COUNT_ANSWERS_STAR - 1) {
                setPointsCoefficient(3);
            }
            if (countRightAnswer === 3 * GAME_COUNT_ANSWERS_STAR - 1) {
                setPointsCoefficient(4);
            }

            const answerPoint = ANSWER_POINT * pointsCoefficient;

            setPoints((point) => point + answerPoint);
            setCurrentAnswers((oldArr) => [...oldArr, answerQuetsionObj]);
        } else {
            updateCountAnswers(0);
            setPointsCoefficient(1);
            setWrongAnswers((oldArr) => [...oldArr, answerQuetsionObj]);
        }

        playSong(urlAnswer, true);
        setQuestionNumber((number) => number + 1);
    };

    const anserQuetsionFunc: TSimpleTypeFunction<boolean> = async (
        resultAnswer: boolean
    ) => {
        updateComponentState(resultAnswer);

        if (authorization) {
            await updateAnswerWord(resultAnswer);
        }
    };

    if ((!loadingData && questionNumber === data.length) || timeOutGame) {
        return (
            <GameResult
                points={points}
                needGame={needGame}
                playSong={playSong}
                restartGame={restartGame}
                wrongAnswers={wrongAnswers}
                serviceApi={serviceApi}
                currentAnswers={currentAnswers}
                countNewWords={countNewWords}
                countLearnedWords={countLearnedWords}
                maxLineCurrentAnswers={maxCountRightAnswer}
            />
        );
    }
    return (
        <>
            {!isAudioGame && !loadingData && (
                <GameHeadBlock
                    points={points}
                    setTimeOutGame={setTimeOutGame}
                    pointsCoefficient={pointsCoefficient}
                    countRightAnswer={countRightAnswer}
                />
            )}

            {!loadingData && (
                <Question
                    needGame={needGame}
                    questionInfo={data[questionNumber]}
                    anserQuetsionFunc={anserQuetsionFunc}
                    answersChoices={answersChoices}
                />
            )}
        </>
    );
};

const mapStateToProps = ({
    game: { gameCategory, gamePage, gameOnePage },
    user: { wordsSettings, token, id, authorization },
    statistic: { learnedWords, optional },
}: IState) => ({
    authorization,
    token,
    id,
    gameOnePage,
    gameCategory,
    gamePage,
    wordsSettings,
    learnedWords,
    optional,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeSrcSong: (audio: string, local?: boolean) => {
            if (local) {
                dispatch(changeAudioLocalSrc(audio));
            } else {
                dispatch(changeAudioSrc(audio));
            }
        },
        changePlay: (play: boolean) => {
            dispatch(changeAudioPlay(play));
        },

        addWordInfo: (id: string, options: IUserWordKeys) => {
            dispatch(addUserWord(id, options));
        },
        updateWordGameState: (id: string, options: Partial<IUserWordKeys>) => {
            dispatch(updateUserWord(id, options));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApiContextWrapper(GameBodyBlock));
