import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoriesLinks from "../../components/categoriesLinks";
import Loader from "../../components/loader";
import PaginationPage from "../../components/pagination";
import SectionContent from "../../components/section";
import WordsList from "../../components/wordsList";
import { COUNT_PAGE, NUMBER_HIDDEN_CATEGORY } from "../../helpers/consts";
import { getWords } from "../../services/services";

import { IBookPageProps } from "../../types/book";
import { IState } from "../../types/redux";
import "./index.scss";

const BookPage = ({
    vocabularyCategory,
    vocabularyPage,
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

    return (
        <SectionContent nameClass="book__section">
            <h1 className="title">Словарь</h1>

            <CategoriesLinks />

            {loadingData ? (
                <Loader />
            ) : (
                <WordsList
                    bookListInfoArr={bookListData}
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
}: IState) => ({
    vocabularyCategory,
    vocabularyPage,
});

export default connect(mapStateToProps)(BookPage);
