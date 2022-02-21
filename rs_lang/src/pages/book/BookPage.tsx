import React from "react";
import { connect } from "react-redux";
import SectionContent from "../../components/section";
import PaginationPage from "../../components/pagination";
import BookCategories from "../../components/bookCategories";
import BookWordsContent from "./BookWordsContent";
import BookLearnedContent from "./BookLearnedContent";
import GamesList from "../../components/gamesList/GamesList";

import { COUNT_PAGE, NUMBER_HIDDEN_CATEGORY } from "../../helpers/consts";
import { IState } from "../../types/redux";
import { IBookPageProps } from "../../types/book";

import "./index.scss";

const BookPage = ({ vocabularyCategory, vocabularyPage }: IBookPageProps) => {
    const hiddenCatActive = vocabularyCategory === NUMBER_HIDDEN_CATEGORY;
    const titleText = hiddenCatActive ? "Список слов" : "Учебник";

    return (
        <SectionContent nameClass={`book__section section__${vocabularyCategory}`}>
            <h1 className="title">{titleText}</h1>

            <BookCategories />

            {
                hiddenCatActive ? (
                    <BookLearnedContent/>
                ) : (
                    <BookWordsContent/>
                )
            }

            {!hiddenCatActive ? (
                <>
                    <PaginationPage
                        activePage={vocabularyPage}
                        countPages={COUNT_PAGE}
                    />

                    <GamesList category={vocabularyCategory} page={vocabularyPage} gameOnePage={true}/>
                </>
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
