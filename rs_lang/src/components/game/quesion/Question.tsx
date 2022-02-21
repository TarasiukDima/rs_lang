import React, { RefObject, useEffect, useRef, useState } from "react";
import { COUNT_BUTTONS_FOR_QUESTIONS, URL_DATA_FILES } from "../../../helpers/consts";
import { randInt, randomArrayNumbers } from "../../../helpers/utils";
import { IQuestionProps } from "../../../types/game";

import "./index.scss";

const Question = ({
    needGame,
    questionInfo,
    anserQuetsionFunc,
    answersChoices,
}: IQuestionProps) => {
    const audioWordRef = useRef() as RefObject<HTMLAudioElement>;

    const [loadingData, setLoadingData] = useState(true);
    const [answersQuestion, setAnswersQuestion] = useState([] as Array<string>);
    const audioGame = needGame === 'audio';

    const playWord = () => {
        audioWordRef?.current?.play();
    };

    const changeDataQuetsion = () => {
        setLoadingData(true);
        const answersIndex = randInt(3, 0);
        const indexAnswerInArrayAnswers = answersChoices.findIndex(
            (val) => val === questionInfo.wordTranslate
        );
        const newArr = randomArrayNumbers(
            3,
            answersChoices.length - 1,
            indexAnswerInArrayAnswers
        ).map((el) => answersChoices[el as number]);
        newArr.splice(answersIndex, 0, questionInfo.wordTranslate);
        setAnswersQuestion(newArr);
        setLoadingData(false);
    };

    const answerClick = (index: number) => {
        anserQuetsionFunc(
            answersQuestion[index] === questionInfo.wordTranslate
        );
    };

    const keyPressFunction = (event: KeyboardEvent) => {
        const number = +event.key;
        const spacePress = event.code === 'Space';
        if (isNaN(number) && !spacePress) return;

        if (number > 0 && number <= COUNT_BUTTONS_FOR_QUESTIONS) {
            anserQuetsionFunc(
                answersQuestion[number - 1] === questionInfo.wordTranslate
            );
        }
        if (spacePress) {
            playWord();
        }
    };


    useEffect(() => {
        changeDataQuetsion();
    }, [questionInfo]);


    useEffect(() => {
        playWord();
    }, []);

    useEffect(() => {
        document.addEventListener("keypress", keyPressFunction);

        return () => {
            document.removeEventListener("keypress", keyPressFunction);
        };
    }, [answersQuestion]);

    const soundButtonClass = audioGame ? "sound__button play__button_big" : "sound__button play__button_small";


    return (
        <>
            {!loadingData && (
                <div className="game__body">
                    {!audioGame && <p className="game__body_title">{questionInfo.word}</p>}

                    <p className="game__body_title">
                        {questionInfo.wordTranslate}
                    </p>

                    <button
                        className={soundButtonClass}
                        onClick={playWord}
                    ></button>

                    <div className="buttons__wrap">
                        {answersQuestion.map((answer, index) => (
                            <li className="button__item" key={answer + index}>
                                <button
                                    className="button"
                                    onClick={() => answerClick(index)}
                                >
                                    <span>{answer}</span>
                                </button>
                            </li>
                        ))}
                    </div>

                    <p className="sub__text">ответить можно как мышкой, так и клавиатурой (цифры 1-4, пробел для проигрывания слова)</p>
                </div>
            )}

            <audio
                className="audio__page"
                src={URL_DATA_FILES + questionInfo.audio}
                ref={audioWordRef}
                onCanPlay={playWord}
            />
        </>
    );
};

export default Question;
