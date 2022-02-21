import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "../../components/loader";
import WordsList from "../../components/wordsList";
import ApiContextWrapper from "../../hoc/ApiContextWrapper";

import { IBookLearnProps, IWordItemObj } from "../../types/book";
import { IState } from "../../types/redux";

const BookLearnedContent = ({
    authorization,
    serviceApi,
    vocabularyHiddenTab,
}: IBookLearnProps) => {
    const [loadingData, setLoadingData] = useState(false);
    const [bookListData, setBookListData] = useState([] as Array<IWordItemObj>);

    const getData = async () => {
        setLoadingData(true);
        const { data, errorText } = await serviceApi.getUserAggregatedWords(vocabularyHiddenTab);
        if (errorText) {
            setLoadingData(false);
            return errorText;
        }
        setBookListData(data[0].paginatedResults);
        setLoadingData(false);
    };

    useEffect(() => {
        getData();
    }, [vocabularyHiddenTab]);

    if (!authorization) return <h3 className="text__center">Авторизируйтесь</h3>;
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
    user: { authorization },
    pages: {vocabularyHiddenTab}
}: IState) => ({
    authorization,
    vocabularyHiddenTab,
});


export default connect(mapStateToProps)(ApiContextWrapper(BookLearnedContent))
