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
    clickButton
}: IWordItemProps) => {
    const [activeSong, setActiveSong] = useState(0);
    const audioPlayList = [audio, audioMeaning, audioExample]

    const playSong = () => {
        clickButton(audioPlayList[activeSong]);
        (activeSong + 1 === 3)
            ? setActiveSong(0)
            : setActiveSong(activeSong + 1);
    }

    const styles = {
        backgroundImage: `url(${URL_DATA_FILES + image})`,
    };
    const clazzList = ['word__item'];

    const autorization = false;
    const itemLearnd = false;
    const difficult = false;

    if (autorization) {
        if (itemLearnd) {
            clazzList.push('learned');
        }
        if (difficult) {
            clazzList.push('difficult');
        }
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
        </li>
    );
};

export default WordsItem;
