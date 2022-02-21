import React from "react";
import Timer from "../../timer";
import { ANSWER_POINT, GAME_COUNT_ANSWERS_STAR, SPRINT_GAME_TIME } from "../../../helpers/consts";
import { IOneGameHeadProps } from "../../../types/game";

import "./index.scss";

const GameHeadBlock = ({ countRightAnswer, pointsCoefficient, setTimeOutGame, points }: IOneGameHeadProps) => {
    const goodAnswersLine = countRightAnswer >= 3 * GAME_COUNT_ANSWERS_STAR ? " active" : "";
    const countPointsForCurrentAnswer = ANSWER_POINT * pointsCoefficient;

    const questionCurrent1 =
        (countRightAnswer >= 1 && countRightAnswer <= GAME_COUNT_ANSWERS_STAR - 1) ||
        (countRightAnswer >= GAME_COUNT_ANSWERS_STAR + 1 && countRightAnswer <= 2 * GAME_COUNT_ANSWERS_STAR - 1) ||
        countRightAnswer >= 2 * GAME_COUNT_ANSWERS_STAR + 1
            ? " active"
            : "";
    const questionCurrent2 =
        (countRightAnswer >= 2 && countRightAnswer <= GAME_COUNT_ANSWERS_STAR - 1) ||
        (countRightAnswer >= GAME_COUNT_ANSWERS_STAR + 2 && countRightAnswer <= 2 * GAME_COUNT_ANSWERS_STAR - 1) ||
        countRightAnswer >= 2 * GAME_COUNT_ANSWERS_STAR + 2
            ? " active"
            : "";
    const questionCurrent3 =
        countRightAnswer > 2 &&
        (countRightAnswer  === GAME_COUNT_ANSWERS_STAR - 1 || countRightAnswer  === 2 * GAME_COUNT_ANSWERS_STAR - 1 || countRightAnswer > 2 * GAME_COUNT_ANSWERS_STAR + 2)
            ? " active"
            : "";

    return (
        <div className="game__head">
            <Timer timeTimer={SPRINT_GAME_TIME} cbEnd={setTimeOutGame} />

            <p className="total__poinst">
                Очки: <span>{points}</span>
            </p>

            <p className="current__points">+{countPointsForCurrentAnswer}</p>

            <div className={"current__answers" + goodAnswersLine}>
                <span className="coefficient__place">{pointsCoefficient}</span>
                <span className={"answer__star" + questionCurrent1}></span>
                <span className={"answer__star" + questionCurrent2}></span>
                <span className={"answer__star" + questionCurrent3}></span>
            </div>
        </div>
    );
};

export default GameHeadBlock;
