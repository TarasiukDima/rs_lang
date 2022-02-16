import React, { useState } from "react";
import { connect } from "react-redux";
import Loader from "../../components/loader";
import WordsList from "../../components/wordsList";

import { IBookLearnProps, IWordItemObj } from "../../types/book";
import { IState } from "../../types/redux";

const BookLearnedContent = ({
    authorization,
    serviceApi,
}: IBookLearnProps) => {
    const [loadingData, setLoadingData] = useState(false);
    const [bookListData, setBookListData] = useState([] as Array<IWordItemObj>);

    // const getData = async () => {
    //     setLoadingData(true);
    //     const {words, errorWordsText} = await serviceApi.getWords(
    //         vocabularyCategory,
    //         vocabularyPage
    //     );
    //     setBookListData(words);
    //     setLoadingData(false);
    // };

    if (!authorization) return <h3>Авторизируйтесь</h3>

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
    user: {authorization}
}: IState) => ({
    authorization,
});

export default connect(mapStateToProps)(BookLearnedContent)
