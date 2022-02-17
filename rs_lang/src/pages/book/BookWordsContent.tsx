import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "../../components/loader";
import WordsList from "../../components/wordsList";

import { IApiWordsObj } from "../../types/api";
import { IBookContentProps, IWordItemObj } from "../../types/book";
import { IState } from "../../types/redux";

const BookWordsContent = ({
    vocabularyCategory,
    vocabularyPage,
    serviceApi,
}: IBookContentProps) => {
    const [loadingData, setLoadingData] = useState(false);
    const [bookListData, setBookListData] = useState([] as Array<IWordItemObj>);

    const getData = async () => {
        setLoadingData(true);
        const { data, errorText: errorWordsText }: IApiWordsObj =
            await serviceApi.getWords(vocabularyCategory, vocabularyPage);
        if (errorWordsText) {
            setLoadingData(false);
            return errorWordsText;
        }
        setBookListData(data);
        setLoadingData(false);
    };

    useEffect(() => {
        getData();
    }, [vocabularyCategory, vocabularyPage]);

    return (
        <>
            {loadingData ? (
                <Loader />
            ) : (
                <WordsList bookListInfoArr={bookListData} />
            )}
        </>
    );
};

const mapStateToProps = ({
    pages: { vocabularyCategory, vocabularyPage },
}: IState) => ({
    vocabularyCategory,
    vocabularyPage,
});

export default connect(mapStateToProps)(BookWordsContent);
