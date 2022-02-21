import React from "react";
import { IAnswerObj, IResultList } from "../../../types/game";

const ResultList = ({
    title,
    array,
    playSong,
    classList,
}: IResultList) => {
    const listClassName = classList ? "list__answers " + classList : "list__answers";
    return (
        <>
            <p className="game__result_title">{title}: <span>{array.length}</span></p>

            <ul className={listClassName}>
                {array.map((answer: IAnswerObj, ind) => (
                    <li key={answer.id} className="list__answers_item">
                        <span className="answer__number">{ind + 1}</span>
                        <button
                            className="play__button"
                            onClick={() => playSong(answer.audio, false)}
                        ></button>
                        <span className="answer__word">{answer.word}</span>
                        -
                        <span className="answer__translate_word">{answer.wordTranslate}</span>
                    </li>)
                )}
            </ul>
        </>
    );
};

export default ResultList;
