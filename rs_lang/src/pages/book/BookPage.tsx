import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoriesLinks from "../../components/categoriesLinks";
import Loader from "../../components/loader";
import PaginationPage from "../../components/pagination";
import SectionContent from "../../components/section";
import WordsList from "../../components/wordsList";
import { COUNT_PAGE, NUMBER_HIDDEN_CATEGORY } from "../../helpers/consts";
import { getWords } from "../../services/services";
import {
    changeAudioPlay,
    changeAudioSrc,
} from "../../store/actions/actionsAudio";

import { IBookPageProps, TSoundButtonClick } from "../../types/book";
import { IAction, IState } from "../../types/redux";
import "./index.scss";

const BookPage = ({
    authorization,
    vocabularyCategory,
    vocabularyPage,
    changeSrcSong,
    changePlay,
}: IBookPageProps) => {
    const [loadingData, setLoadingData] = useState(false);
    const [bookListData, setBookListData] = useState([]);

    const getData = async () => {
        setLoadingData(true);
        const words = await getWords(vocabularyCategory, vocabularyPage);
        setBookListData(words);
        setLoadingData(false);
    };
    const getDifficultData = async () => {
        // setLoadingData(true);
        // const words = await getWords(vocabularyCategory, vocabularyPage);
        // setBookListData(words);
        // setLoadingData(false);
    };
    const showPagination = vocabularyCategory === NUMBER_HIDDEN_CATEGORY ? false : true;

    useEffect(() => {
        if (vocabularyCategory === NUMBER_HIDDEN_CATEGORY) {
            getDifficultData();
        } else {
            getData();
        }
    }, [vocabularyCategory, vocabularyPage]);



    const clickButton: TSoundButtonClick = (audio) => {
        changeSrcSong(audio);
        changePlay(true);
    };

    return (
        <SectionContent nameClass="book__section">
            <h1 className="title">Словарь</h1>

            <CategoriesLinks />

            {loadingData ? (
                <Loader />
            ) : (
                <WordsList
                    authorization={authorization}
                    bookListInfoArr={bookListData}
                    clickButton={clickButton}
                />
            )}

            {showPagination ? (
                 <PaginationPage
                    activePage={vocabularyPage}
                    countPages={COUNT_PAGE}
                />
            ) : (
                <p/>
            )}
        </SectionContent>
    );
};

const mapStateToProps = ({
    vocabulary: { vocabularyCategory, vocabularyPage },
    user: { authorization },
}: IState) => ({
    vocabularyCategory,
    vocabularyPage,
    authorization,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeSrcSong: (audio: string) => {
            dispatch(changeAudioSrc(audio));
        },
        changePlay: (play: boolean) => {
            dispatch(changeAudioPlay(play));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
