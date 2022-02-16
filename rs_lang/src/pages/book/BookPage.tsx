import React from "react";
import { connect } from "react-redux";
import { ApiContextConsumer } from "../../services/servicesContext";
import SectionContent from "../../components/section";
import PaginationPage from "../../components/pagination";
import BookCategories from "../../components/bookCategories";
import BookWordsContent from "./BookWordsContent";

import { COUNT_PAGE, NUMBER_HIDDEN_CATEGORY } from "../../helpers/consts";
import { IState } from "../../types/redux";
import { IBookPageProps } from "../../types/book";

import "./index.scss";
import BookLearnedContent from "./BookLearnedContent";

const BookPage = ({ vocabularyCategory, vocabularyPage }: IBookPageProps) => {
    const hiddenCatActive = vocabularyCategory === NUMBER_HIDDEN_CATEGORY;
    const titleText = hiddenCatActive ? "Список, изучаемых слов" : "Словарь";

    return (
        <SectionContent nameClass="book__section">
            <h1 className="title">{titleText}</h1>

            <BookCategories />

            <ApiContextConsumer>
                {(serviceApi) =>
                    hiddenCatActive ? (
                        <BookLearnedContent serviceApi={serviceApi} />
                    ) : (
                        <BookWordsContent serviceApi={serviceApi} />
                    )
                }
            </ApiContextConsumer>

            {!hiddenCatActive ? (
                <PaginationPage
                    activePage={vocabularyPage}
                    countPages={COUNT_PAGE}
                />
            ) : <></>}
        </SectionContent>
    );
};

const mapStateToProps = ({
    pages: { vocabularyCategory, vocabularyPage },
}: IState) => ({
    vocabularyCategory,
    vocabularyPage,
});

export default connect(mapStateToProps)(BookPage);
