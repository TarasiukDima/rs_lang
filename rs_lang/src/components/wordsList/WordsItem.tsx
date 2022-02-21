import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";

import ButtonEl from "../button";

import { NUMBER_HIDDEN_CATEGORY, URL_DATA_FILES } from "../../helpers/consts";
import {
    changeAudioPlay,
    changeAudioSrc,
} from "../../store/actions/actionsAudio";
import {
    addUserDifficultWord,
    addUserLearnedWord,
    addUserWord,
    removeUserDifficultWord,
    removeUserLearnedWord,
    updateUserWord,
} from "../../store/actions/actionsUser";
import { IWordItemProps, TSoundButtonClick } from "../../types/book";
import {
    IAction,
    IState,
    IUserWordKeys,
} from "../../types/redux";

const WordsItem = ({
    serviceApi,
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

    vocabularyHiddenTab,
    vocabularyCategory,
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
    addWordInfo,
    updateWordGameState,
}: IWordItemProps) => {
    const wordInLearned = wordsSettings[id] ? wordsSettings[id].learned : false;
    const wordInDifficult = wordsSettings[id]
        ? wordsSettings[id].difficult
        : false;
    const audioPlayList = [audio, audioMeaning, audioExample];
    const difficultTabActive = vocabularyHiddenTab === 0;
    const hiddenCatActive = vocabularyCategory === NUMBER_HIDDEN_CATEGORY;
    const showTwoButtons = !hiddenCatActive && authorization;
    const showDifficultButton =
        hiddenCatActive && authorization && difficultTabActive;
    const showLearnedButton =
        hiddenCatActive && authorization && !difficultTabActive;

    const [loading, setLoading] = useState(false);
    const [activeSong, setActiveSong] = useState(0);
    const [difficult, setDifficult] = useState(wordInDifficult);
    const [learned, setLearned] = useState(wordInLearned);

    useEffect(() => {
        setCoutnSecond(true);
        learned ? changeCountLearnedItems(+1) : changeCountLearnedItems(-1);
    }, [learned]);

    const clickButton: TSoundButtonClick = (audio: string) => {
        changeSrcSong(audio);
        changePlay(true);
    };


    const playSong = () => {
        clickButton(audioPlayList[activeSong]);
        activeSong + 1 === 3 ? setActiveSong(0) : setActiveSong(activeSong + 1);
    };

    const changeWordInformtion = async (
        operatiionType: "add" | "remove",
        varient: "learned" | "difficult"
    ) => {
        if (!authorization) return;

        const addStateWord = operatiionType === "add";

        const optionsObj = {
            userId: userID,
            wordId: id,
            wordOptions: {
                learned: false,
                difficult: false,
                countCurrentAnswer: 0,
                countWrongAnswer: 0,
                game: false,
            },
            token,
        };

        if (varient === "learned") {
            optionsObj.wordOptions.learned = addStateWord;
            optionsObj.wordOptions.difficult = wordsSettings[id]
                ? wordsSettings[id].difficult
                : false;
        } else {
            optionsObj.wordOptions.learned = wordsSettings[id]
                ? wordsSettings[id].learned
                : false;
            optionsObj.wordOptions.difficult = addStateWord;
        }

        if (id in wordsSettings) {
            if (varient === "learned") {
                addStateWord ? addLearned(id) : removeLearned(id);
            } else {
                addStateWord ? addDifficult(id) : removeDifficult(id);
            }

            optionsObj.wordOptions.game = wordsSettings[id].game;
            updateWordGameState(id, optionsObj.wordOptions);
            return await serviceApi.updateUserWord(optionsObj);
        }

        addWordInfo(optionsObj.wordId, optionsObj.wordOptions);
        return await serviceApi.createUserWord(optionsObj);
    };

    const changeDifficult = async () => {
        setLoading(true);
        difficult
            ? await changeWordInformtion("remove", "difficult")
            : await changeWordInformtion("add", "difficult");
        setDifficult((difficult) => !difficult);
        setLoading(false);
    };

    const changeLearned = async () => {
        setLoading(true);
        learned
            ? await changeWordInformtion("remove", "learned")
            : await changeWordInformtion("add", "learned");
        setLearned((learned) => !learned);
        setLoading(false);
    };

    const clazzList = ["word__item"];

    if (authorization && learned) {
        clazzList.push("learned");
    }
    if (authorization && difficult) {
        clazzList.push("difficult");
    }

    const difficultButtonText = difficult
        ? "Убрать из сложных"
        : "Добавить в сложные";

    const leanedButtonText = learned
        ? "Убрать из изученных"
        : "Добавить в изученные";
    return (
        <li
            className={clazzList.join(" ")}
            style={{ backgroundImage: `url(${URL_DATA_FILES + image})` }}
        >
            <p className="item__name">{word}</p>

            <p className="item__name_translate">
                <span className="name__text">{wordTranslate}</span>
                <span className="name__transcription">{transcription}</span>
                <button className="play__button" onClick={playSong}></button>
            </p>

            <p className="item__meaning">
                <span className="item__text_title">Meaning (Значение):</span>
                <span dangerouslySetInnerHTML={{ __html: textMeaning }} />
                <span>{textMeaningTranslate}</span>
            </p>

            <p className="item__example">
                <span className="item__text_title">Example (Пример):</span>
                <span dangerouslySetInnerHTML={{ __html: textExample }} />
                <span>{textExampleTranslate}</span>
            </p>

            <div className="buttons__wrap">
                {(showTwoButtons || showDifficultButton) && (
                    <ButtonEl
                        nameClass="button__card"
                        onclick={changeDifficult}
                        disable={loading}
                    >
                        {difficultButtonText}
                    </ButtonEl>
                )}

                {(showTwoButtons || showLearnedButton) && (
                    <ButtonEl
                        nameClass="button__card"
                        onclick={changeLearned}
                        disable={loading}
                    >
                        {leanedButtonText}
                    </ButtonEl>
                )}
            </div>
        </li>
    );
};

const mapStateToProps = ({
    user: { authorization, id, wordsSettings, token },
    pages: { vocabularyHiddenTab, vocabularyCategory },
}: IState) => ({
    token,
    vocabularyCategory,
    userID: id,
    authorization,
    wordsSettings,
    vocabularyHiddenTab,
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
        addWordInfo: (id: string, options: IUserWordKeys) => {
            dispatch(addUserWord(id, options));
        },
        updateWordGameState: (id: string, options: Partial<IUserWordKeys>) => {
            dispatch(updateUserWord(id, options));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsItem);
