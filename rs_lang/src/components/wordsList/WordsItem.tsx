import React from "react";

import { IWordItemProps } from "../../types/book";
import avatar2 from "../../assets/img/avatar2.jpg";

const URL_BECKEND = "";

const WordsItem = ({
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textMeaningTranslate,
    wordTranslate,
    transcription,
    textExample,
    textExampleTranslate,
    clickButton
}: IWordItemProps) => {
    const imgStyles = {
        backgroundImage: `url(${URL_BECKEND + image})`,
    };


    // TODO: delete
    const styles = {
        backgroundImage: `url(${avatar2})`,
    };

    return (
        // learned difficult
        // <li className="word__item" style={imgStyles}>
        <li className="word__item learned difficult" style={styles}>
            <p className="item__name">{word}</p>

            <p className="item__name_translate">
                <span className="name__text">{wordTranslate}</span>
                <span className="name__transcription">{transcription}</span>
                <button
                    className="play__button"
                    onClick={() => clickButton(audio, audioMeaning, audioExample)}
                ></button>
            </p>

            <p className="item__meaning">
                <span className="item__text_title">Meaning (Значение):</span>
                <span>{textMeaning}</span>
                <span>{textMeaningTranslate}</span>
            </p>

            <p className="item__example">
                <span className="item__text_title">Example (Пример):</span>
                <span>{textExample}</span>
                <span>{textExampleTranslate}</span>
            </p>
        </li>
    );
};

export default WordsItem;
