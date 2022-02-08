import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "../../components/loader";
import PaginationPage from "../../components/pagination";
import SectionContent from "../../components/section";
import TabList from "../../components/tabList";
import WordsList from "../../components/wordsList";
import { COUNT_PAGE, tabsBookInfo } from "../../helpers/settings";
import ServiceApi from "../../services/services";
import {
    changeAudioPlay,
    changeAudioSrc,
    changeVocabularyCategory,
    changeVocabularyPage,
} from "../../store/actions";
import { IBookPageProps, TSoundButtonClick } from "../../types/book";
import { TTabClickFC } from "../../types/common";
import { IAction, IState } from "../../types/redux";
import "./index.scss";

const BookPage = ({
    vocabularyCategory,
    vocabularyPage,
    changeCategory,
    changePage,
    changeSrcSong,
    changePlay,
}: IBookPageProps) => {
    const [loadingData, setLoadingData] = useState(false);
    const [bookListData, setBookListData] = useState([]);

    const getData = async () => {
        setLoadingData(true);
        const words = await new ServiceApi().getWords(
            vocabularyCategory,
            vocabularyPage
        );
        setBookListData(words);
        setLoadingData(false);
    };

    useEffect(() => {
        getData();
    }, [vocabularyCategory, vocabularyPage]);

    const changeCategoryNumber: TTabClickFC = (id: number) => {
        changePage(1);
        changeCategory(id);
    };

    const clickPaginationButton: TTabClickFC = (id) => {
        changePage(id);
    };

    const clickButton: TSoundButtonClick = (audio) => {
        changeSrcSong(audio);
        changePlay(true);
    };

    return (
        <SectionContent nameClass="book__section">
            <h1 className="title">Словарь</h1>

            <TabList
                tabsInfo={tabsBookInfo}
                tabClick={changeCategoryNumber}
                activeTab={vocabularyCategory}
            />

            {loadingData ? (
                <Loader />
            ) : (
                <WordsList
                    bookListInfoArr={bookListData}
                    clickButton={clickButton}
                />
            )}

            <PaginationPage
                activePage={vocabularyPage}
                clickButton={clickPaginationButton}
                countPages={COUNT_PAGE}
            />
        </SectionContent>
    );
};

const mapStateToProps = ({ vocabularyCategory, vocabularyPage }: IState) => ({
    vocabularyCategory,
    vocabularyPage,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeCategory: (categoryNumber: number) => {
            dispatch(changeVocabularyCategory(categoryNumber));
        },
        changePage: (pageNumber: number) => {
            dispatch(changeVocabularyPage(pageNumber));
        },
        changeSrcSong: (audio: string) => {
            dispatch(changeAudioSrc(audio));
        },
        changePlay: (play: boolean) => {
            dispatch(changeAudioPlay(play));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
