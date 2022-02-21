import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";

import ButtonEl from "../button";

import { LOCASTORAGE__NAME_USER, LOCASTORAGE__USER_STATISTIC, NUMBER_HIDDEN_CATEGORY, URL_DATA_FILES } from "../../helpers/consts";
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
import { IAction, ISTATDayFields, IState, ISTATOptions, IUserWordKeys } from "../../types/redux";
import { changeAllLearnedWords, updateAllWordStatistic } from "../../store/actions/actionsStatistic";
import { checkSettingsLocalStorage, saveSettingsLocalStorage } from "../../helpers/utils";
import { USER_LOCAL_KEYS } from "../../helpers/settings";
import { ILocalStoragUser } from "../../types/form";

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


    learnedWords,
    optional,
    changeCountAllLearnedStatistic,
    changeDateStatistic,
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

    const soundAudio: TSoundButtonClick = (audio: string) => {
        changeSrcSong(audio);
        changePlay(true);
    };

    const playSong = () => {
        soundAudio(audioPlayList[activeSong]);
        activeSong + 1 === 3 ? setActiveSong(0) : setActiveSong(activeSong + 1);
    };

    const changeStatisticWord = async (
        isLearnedButton: boolean,
        isAddOperation: boolean
    ) => {
        if (!authorization || !isLearnedButton) return;

        const dateObj = new Date();
        const keyWordStatistic = `${dateObj.getFullYear()}, ${dateObj.getMonth()}, ${dateObj.getDate()}`;
        const newOptions: ISTATOptions = JSON.parse(JSON.stringify(optional));
        const isLearnedOperation = isAddOperation ? 1 : 0;
        const datStatistic: ISTATDayFields = {
            wrongAnswers: 0,
            correctAnswers: 0,
            longestSeries: 0,
            learnedWords: isLearnedOperation,
            countNewWords: 0,
        }

        let newLearnedWOrds = learnedWords;

        if (isAddOperation && isLearnedButton) {
            newLearnedWOrds = newLearnedWOrds +1;
        }

        if (keyWordStatistic in optional.wordStatistics) {
            datStatistic.wrongAnswers = optional.wordStatistics[keyWordStatistic].wrongAnswers;
            datStatistic.correctAnswers = optional.wordStatistics[keyWordStatistic].correctAnswers;
            datStatistic.longestSeries = optional.wordStatistics[keyWordStatistic].longestSeries;
            datStatistic.learnedWords = optional.wordStatistics[keyWordStatistic].learnedWords + 1;
            datStatistic.countNewWords = optional.wordStatistics[keyWordStatistic].countNewWords;
        }
        newOptions.wordStatistics[keyWordStatistic] = datStatistic;

        changeCountAllLearnedStatistic(newLearnedWOrds);
        changeDateStatistic(keyWordStatistic, datStatistic);

        const newStatisticState = {
            learnedWords: newLearnedWOrds,
            optional: newOptions
        }

        saveSettingsLocalStorage(LOCASTORAGE__USER_STATISTIC, newStatisticState)
        return await serviceApi.updateUseStatistics(newStatisticState);
    }

    const changeWordInformtion = async (
        operatiionType: "add" | "remove",
        varient: "learned" | "difficult"
    ) => {
        if (!authorization) return;
        const isLearnedButton = varient === "learned";
        const isAddOperation = operatiionType === "add";

        /// not time this is very bad
        const newObjForSave = {
            id: "0",
            name: "0",
            token: "0",
            refreshToken: "0",
            authorization: false,
            wordsSettings: {},
            time: 0,
            countNewWords:  0,
        }
        const localStorageObjUser = checkSettingsLocalStorage(
            LOCASTORAGE__NAME_USER,
            USER_LOCAL_KEYS
        ) as ILocalStoragUser;

        if (localStorageObjUser) {
            newObjForSave.id =  localStorageObjUser.id;
            newObjForSave.name =  localStorageObjUser.name;
            newObjForSave.token =  localStorageObjUser.token;
            newObjForSave.refreshToken =  localStorageObjUser.refreshToken;
            newObjForSave.authorization =  localStorageObjUser.authorization;
            newObjForSave.wordsSettings =  localStorageObjUser.wordsSettings;
            newObjForSave.time =  localStorageObjUser.time || 0;
            newObjForSave.countNewWords =  localStorageObjUser.countNewWords || 0;
        }

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

        changeStatisticWord(isLearnedButton, isAddOperation);

        if (isLearnedButton) {
            optionsObj.wordOptions.learned = isAddOperation;
            optionsObj.wordOptions.difficult = wordsSettings[id]
                ? wordsSettings[id].difficult
                : false;
        } else {
            optionsObj.wordOptions.learned = wordsSettings[id]
                ? wordsSettings[id].learned
                : false;
            optionsObj.wordOptions.difficult = isAddOperation;
        }

        if (id in wordsSettings) {
            if (isLearnedButton) {
                isAddOperation ? addLearned(id) : removeLearned(id);
            } else {
                isAddOperation ? addDifficult(id) : removeDifficult(id);
            }

            optionsObj.wordOptions.game = wordsSettings[id].game;
            localStorageObjUser.wordsSettings[id] = optionsObj.wordOptions;
            saveSettingsLocalStorage(LOCASTORAGE__NAME_USER, localStorageObjUser);
            updateWordGameState(id, optionsObj.wordOptions);
            return await serviceApi.updateUserWord(optionsObj);
        }

        localStorageObjUser.wordsSettings[id] = optionsObj.wordOptions;
        saveSettingsLocalStorage(LOCASTORAGE__NAME_USER, localStorageObjUser);
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
    statistic: {learnedWords, optional}
}: IState) => ({
    token,
    vocabularyCategory,
    userID: id,
    authorization,
    wordsSettings,
    vocabularyHiddenTab,

    learnedWords,
    optional
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


        changeCountAllLearnedStatistic: (count:number) => {
            dispatch(changeAllLearnedWords(count));
        },
        changeDateStatistic: (date: string, options: ISTATDayFields) => {
            dispatch(updateAllWordStatistic(date, options));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsItem);
