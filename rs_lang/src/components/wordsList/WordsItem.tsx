import React, { Dispatch, useEffect, useState } from "react";

import { IWordItemProps, TSoundButtonClick } from "../../types/book";
import { URL_DATA_FILES } from "../../helpers/consts";
import { IAction, IState } from "../../types/redux";
import { changeAudioPlay, changeAudioSrc } from "../../store/actions/actionsAudio";
import { addUserDifficultWord, addUserLearnedWord, removeUserDifficultWord, removeUserLearnedWord } from "../../store/actions/actionsUser";
import { connect } from "react-redux";
import { createUserWord, updateUserWord } from "../../services/services";

const WordsItem = ({
    id,
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

    changeCountLearnedItems,
    setCoutnSecond,

    token,
    userID,
    wordsSettings,
    authorization,
    changeSrcSong,
    changePlay,
    addLearned,
    removeLearned,
    addDifficult,
    removeDifficult,
}: IWordItemProps) => {
    const wordInLearned = wordsSettings[id] ? wordsSettings[id].learned : false;
    const wordInDifficult = wordsSettings[id] ? wordsSettings[id].difficult : false;
    const [loading, setLoading] = useState(false);
    const [activeSong, setActiveSong] = useState(0);
    const [difficult, setDifficult] = useState(wordInDifficult);
    const [learned, setLearned] = useState(wordInLearned);
    const audioPlayList = [audio, audioMeaning, audioExample];

    useEffect(() => {
        setCoutnSecond(true);

        (learned)
            ? changeCountLearnedItems(+1)
            : changeCountLearnedItems(-1);

    },[learned])


    const clickButton: TSoundButtonClick = (audio: string) => {
        changeSrcSong(audio);
        changePlay(true);
    };

    const playSong = () => {
        clickButton(audioPlayList[activeSong]);
        (activeSong + 1 === 3)
            ? setActiveSong(0)
            : setActiveSong(activeSong + 1);
    }


    const changeWordInformtion = async (varient: "add" | "remove", key: "learned" | "difficult") => {
        const optionsObj = {
            userId: userID,
            wordId: id,
            wordOptions: {
                learned: false,
                difficult: false,
            },
            token,
        };

        if (key === 'learned') {
            optionsObj.wordOptions.learned = varient === "add";
            optionsObj.wordOptions.difficult = wordsSettings[id] ? wordsSettings[id].difficult : false;
        } else {
            optionsObj.wordOptions.learned = wordsSettings[id] ? wordsSettings[id].learned : false;
            optionsObj.wordOptions.difficult = varient === "add";
        }


        if (id in wordsSettings) {
            const data = await updateUserWord(optionsObj);
            console.log(data);
            return;
        }

        const data = await createUserWord(optionsObj);
        console.log(data);
    }

    const changeDifficult = (id: string) => {
        setLoading(true);

        if (difficult) {
            changeWordInformtion("remove", "difficult");
            removeDifficult(id);

        } else {
            changeWordInformtion("add", "difficult");
            addDifficult(id);
        }
        setDifficult((difficult) => !difficult);
        setLoading(false);
    }

    const changeLearned = (id: string) => {
        setLoading(true);

        if (learned) {
            changeWordInformtion("remove", "learned");
            removeLearned(id);
        } else {
            changeWordInformtion("add", "learned");
            addLearned(id);
        }

        setLearned((learned) => !learned);
        setLoading(false);
    }

    const clazzList = ['word__item'];

    if (authorization && learned) {
        clazzList.push('learned');
    }
    if (authorization && difficult) {
        clazzList.push('difficult');
    }

    return (
        <li className={clazzList.join(' ')} style={{backgroundImage: `url(${URL_DATA_FILES + image})`}}>
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
                        onClick={()=>changeDifficult(id)}
                        disabled={loading}
                    >{ difficult ? "Убрать из сложных" : "Добавить в сложные"}</button>
                    <button
                        className="button__card"
                        onClick={()=>changeLearned(id)}
                        disabled={loading}
                    >{ learned ? "Убрать из изученных" : "Добавить в изученные"}</button>
                </div>
            )}
        </li>
    );
};


const mapStateToProps = ({ user: { authorization, id, wordsSettings, token } }: IState) => ({
    token,
    userID: id,
    authorization,
    wordsSettings,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeSrcSong: (audio: string) => {
            dispatch(changeAudioSrc(audio));
        },
        changePlay: (play: boolean) => {
            dispatch(changeAudioPlay(play));
        },
        addLearned: (id: string) => {
            dispatch(addUserLearnedWord(id));
        },
        removeLearned: (id: string) => {
            dispatch(removeUserLearnedWord(id));
        },
        addDifficult: (id: string) => {
            dispatch(addUserDifficultWord(id));
        },
        removeDifficult: (id: string) => {
            dispatch(removeUserDifficultWord(id));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsItem);

