import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NUMBER_HIDDEN_CATEGORY, URL_DATA_FILES } from "../../helpers/consts";
import {
    changeAudioPlay,
    changeAudioSrc,
} from "../../store/actions/actionsAudio";
import {
    addUserDifficultWord,
    addUserLearnedWord,
    removeUserDifficultWord,
    removeUserLearnedWord,
} from "../../store/actions/actionsUser";
import { IWordItemProps, TSoundButtonClick } from "../../types/book";
import { IAction, IState } from "../../types/redux";
import ButtonEl from "../button";
import button from "../button";

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
}: IWordItemProps) => {
    const wordInLearned = wordsSettings[id] ? wordsSettings[id].learned : false;
    const wordInDifficult = wordsSettings[id]
        ? wordsSettings[id].difficult
        : false;
    const [loading, setLoading] = useState(false);
    const [activeSong, setActiveSong] = useState(0);
    const [difficult, setDifficult] = useState(wordInDifficult);
    const [learned, setLearned] = useState(wordInLearned);
    const audioPlayList = [audio, audioMeaning, audioExample];
    const difficultTabActive = vocabularyHiddenTab === 0;
    const hiddenCatActive = vocabularyCategory === NUMBER_HIDDEN_CATEGORY;
    const showTwoButtons = !hiddenCatActive && authorization;
    const showDifficultButton =
        hiddenCatActive && authorization && difficultTabActive;
    const showLearnedButton =
        hiddenCatActive && authorization && !difficultTabActive;

    useEffect(() => {
        setCoutnSecond(true);

        learned
            ? changeCountLearnedItems(+1)
            : changeCountLearnedItems(-1);
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
        const optionsObj = {
            userId: userID,
            wordId: id,
            wordOptions: {
                learned: false,
                difficult: false,
            },
            token,
        };

        if (varient === "learned") {
            optionsObj.wordOptions.learned = operatiionType === "add";
            optionsObj.wordOptions.difficult = wordsSettings[id]
                ? wordsSettings[id].difficult
                : false;
        } else {
            optionsObj.wordOptions.learned = wordsSettings[id]
                ? wordsSettings[id].learned
                : false;
            optionsObj.wordOptions.difficult = operatiionType === "add";
        }

        if (id in wordsSettings) {
            return await serviceApi.updateUserWord(optionsObj);
        }

        return await serviceApi.createUserWord(optionsObj);
    };

    const changeDifficult = async (id: string) => {
        setLoading(true);

        if (difficult) {
            await changeWordInformtion("remove", "difficult");
            removeDifficult(id);
        } else {
            await changeWordInformtion("add", "difficult");
            addDifficult(id);
        }
        setDifficult((difficult) => !difficult);
        setLoading(false);
    };

    const changeLearned = async (id: string) => {
        setLoading(true);

        if (learned) {
            await changeWordInformtion("remove", "learned");
            removeLearned(id);
        } else {
            await changeWordInformtion("add", "learned");
            addLearned(id);
        }

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
                        onclick={() => changeDifficult(id)}
                        disable={loading}
                    >
                        {difficultButtonText}
                    </ButtonEl>
                )}


                {(showTwoButtons || showLearnedButton) && (
                    <ButtonEl
                        nameClass="button__card"
                        onclick={() => changeLearned(id)}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsItem);
