import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ApiContextWrapper from "../../hoc/ApiContextWrapper";
import Loader from "../loader";
import GameBodyBlock from "./gameBodyBlock/GameBodyBlock";

import { randomArrayNumbers } from "../../helpers/utils";
import {
    COUNT_MAX_AUDIO_GAME_QUESTIONS,
    COUNT_MAX_SPRINT_GAME_QUESTIONS,
    MIN_COUNT_QUESTIONS_FOR_GAME,
    PageLinks,
} from "../../helpers/consts";
import { IState } from "../../types/redux";
import { IApiGameWordsObj, IApiWordsObj } from "../../types/api";
import { IWordItemObj } from "../../types/book";
import { IGameBlockProps } from "../../types/game";

import "./index.scss";

const Game = ({
    wordsSettings,
    gameOnePage,
    needGame,
    serviceApi,
    gameCategory,
    gamePage,
}: IGameBlockProps) => {
    const [loadingData, setLoadingData] = useState(false);
    const [bookListData, setBookListData] = useState([] as Array<IWordItemObj>);

    const showGame = needGame === "audio" || needGame === "sprint";

    const changeQuestionsArrayAudio = (arr: Array<IWordItemObj>) => {
        if (arr.length > 100) {
            const newArr: Array<IWordItemObj> = randomArrayNumbers(
                COUNT_MAX_AUDIO_GAME_QUESTIONS,
                arr.length - 1
            ).map((el) => arr[el as number]);
            console.log("newArr", newArr);

            setBookListData(newArr);
            setLoadingData(false);
            return;
        }

        setBookListData(arr.slice(0, COUNT_MAX_AUDIO_GAME_QUESTIONS));
        setLoadingData(false);
    };

    const changeQuestionsArraySprint = (arr: Array<IWordItemObj>) => {
        if (arr.length > COUNT_MAX_SPRINT_GAME_QUESTIONS) {
            const newArr: Array<IWordItemObj> = randomArrayNumbers(
                COUNT_MAX_SPRINT_GAME_QUESTIONS,
                arr.length - 1
            ).map((el) => arr[el as number]);

            setBookListData(newArr);
            setLoadingData(false);
            return;
        }

        setBookListData(arr);
        setLoadingData(false);
    };

    const addGameQuestions = (data: Array<IWordItemObj>) => {
        const newArr: Array<IWordItemObj> = [];

        data.forEach((el) => {
            if (
                (el.id in wordsSettings && !wordsSettings[el.id].learned) ||
                !(el.id in wordsSettings)
            ) {
                newArr.push(el);
            }
        });

        if (newArr.length <= COUNT_MAX_AUDIO_GAME_QUESTIONS) {
            setBookListData(newArr);
            setLoadingData(false);
            return;
        }

        if (needGame === "sprint") {
            changeQuestionsArraySprint(newArr);
        } else {
            changeQuestionsArrayAudio(newArr);
        }
    };

    const getData = async () => {
        setLoadingData(true);
        const category = gameCategory === null ? 0 : gameCategory;
        const page = gamePage === null ? 0 : gamePage;

        const {
            data,
            errorText: errorWordsText,
        }: IApiGameWordsObj | IApiWordsObj = await serviceApi.getGameWords(
            category,
            page,
            gameOnePage
        );

        if (errorWordsText) {
            setLoadingData(false);
            return errorWordsText;
        }
        addGameQuestions(data.flat());
    };

    useEffect(() => {
        getData();
    }, []);

    if (!loadingData && bookListData.length < MIN_COUNT_QUESTIONS_FOR_GAME) {
        return (
            <div className="game__body">
                <h2 className="title">
                    Недостаточно слов в данной категории или странице для игры
                </h2>

                <Link
                    className="button shadow__button"
                    to={PageLinks.gamesPage}
                >
                    <span>Вурнуться к играм</span>
                </Link>
            </div>
        );
    }

    return (
        <>
            {loadingData ? (
                <Loader />
            ) : showGame ? (
                <GameBodyBlock data={bookListData} needGame={needGame} />
            ) : null}
        </>
    );
};

const mapStateToProps = ({
    game: { gameCategory, gamePage, gameOnePage },
    user: { wordsSettings },
}: IState) => ({
    wordsSettings,
    gameOnePage,
    gameCategory,
    gamePage,
});

export default connect(mapStateToProps)(ApiContextWrapper(Game));
