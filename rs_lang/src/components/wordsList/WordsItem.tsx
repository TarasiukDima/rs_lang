import React, { useState } from "react";

import { IWordItemProps } from "../../types/book";
import { URL_DATA_FILES } from "../../helpers/consts";

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
    clickButton,
    authorization,
}: IWordItemProps) => {
    const [activeSong, setActiveSong] = useState(0);
    const [difficult, setDifficult] = useState(false);
    const [learned, setLearned] = useState(false);
    const audioPlayList = [audio, audioMeaning, audioExample]

    const playSong = () => {
        clickButton(audioPlayList[activeSong]);
        (activeSong + 1 === 3)
            ? setActiveSong(0)
            : setActiveSong(activeSong + 1);
    }

    const changeDifficult = () => {
        setDifficult((difficult) => !difficult);
    }

    const changeLearned = () => {
        setLearned((learned) => !learned);
    }

    const styles = {
        backgroundImage: `url(${URL_DATA_FILES + image})`,
    };
    const clazzList = ['word__item'];

    if (authorization && learned) {
        clazzList.push('learned');
    }
    if (authorization && difficult) {
        clazzList.push('difficult');
    }

    return (
        <li className={clazzList.join(' ')} style={styles}>
            <p className="item__name">{word}</p>

            <p className="item__name_translate">
                <span className="name__text">{wordTranslate}</span>
                <span className="name__transcription">{transcription}</span>
                <button
                    className="play__button"
                    onClick={playSong}
                ></button>
            </p>

            <p className="item__meaning">
                <span className="item__text_title">Meaning (Значение):</span>
                <span dangerouslySetInnerHTML={{__html: textMeaning}}/>
                <span>{textMeaningTranslate}</span>
            </p>

            <p className="item__example">
                <span className="item__text_title">Example (Пример):</span>
                <span dangerouslySetInnerHTML={{__html: textExample}}/>
                <span>{textExampleTranslate}</span>
            </p>

            {authorization && (
                <div className="buttons__wrap">
                    <button
                        className="button__card"
                        onClick={changeDifficult}
                    >{ difficult ? "Убрать из сложных" : "Добавить в сложные"}</button>
                    <button
                        className="button__card"
                        onClick={changeLearned}
                    >{ learned ? "Убрать из изученных" : "Добавить в изученные"}</button>
                </div>
            )}
        </li>
    );
};

export default WordsItem;
