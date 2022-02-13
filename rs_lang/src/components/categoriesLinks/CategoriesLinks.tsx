import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { categoriesNumbers, NAME_HIDDEN_CATEGORY, NUMBER_HIDDEN_CATEGORY } from "../../helpers/consts";
import {
    changeVocabularyCategory,
    changeVocabularyPage,
} from "../../store/actions/actionsVocabulary";
import { TSimpleTypeFunction } from "../../types/common";
import { IAction, IState } from "../../types/redux";
import CategoriesLinkItem from "./CategoriesLinkItem";

import "./index.scss";

export interface ICategoriesProps {
    authorization: boolean;
    changeCategory: TSimpleTypeFunction<number>;
    changePage: TSimpleTypeFunction<number>;
}

const CategoriesLinks = ({
    authorization,
    changeCategory,
    changePage,
}: ICategoriesProps) => {


    const changeCategoryPage = (page: number) => {
        changePage(0);
        changeCategory(page);
    };
    return (
        <nav className="categories__nav">
            <ul className="categories__list">
                {categoriesNumbers.map((pageCategory) => (
                    <CategoriesLinkItem
                        key={pageCategory}
                        pageNumber={pageCategory}
                        clickFunction={changeCategoryPage}
                    />
                ))}

                {authorization && (
                    <CategoriesLinkItem
                        pageNumber={NUMBER_HIDDEN_CATEGORY}
                        clickFunction={changeCategoryPage}
                        textLink={NAME_HIDDEN_CATEGORY}
                    />
                )}
            </ul>
        </nav>
    );
};

const mapStateToProps = ({
    user: { authorization },
}: IState) => ({
    authorization,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeCategory: (categoryNumber: number) => {
            dispatch(changeVocabularyCategory(categoryNumber));
        },
        changePage: (pageNumber: number) => {
            dispatch(changeVocabularyPage(pageNumber));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesLinks);
