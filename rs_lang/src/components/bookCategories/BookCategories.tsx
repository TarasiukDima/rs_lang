import React, { Dispatch } from "react";
import { connect } from "react-redux";
import TabList from "../../components/tabList";
import TabItem from "../../components/tabList/TabItem";

import { hiddenCategoriesTabsInfo, tabsBookInfo } from "../../helpers/settings";
import {
    LOCASTORAGE__VOC_CAT,
    LOCASTORAGE__VOC_HIDDEN_TAB,
    NAME_HIDDEN_CATEGORY,
    NUMBER_HIDDEN_CATEGORY,
} from "../../helpers/consts";
import {
    changeHiddenTabName,
    changeVocabularyCategory,
} from "../../store/actions/actionsPages";

import { IBookCategoriesProps } from "../../types/book";
import { IAction, IState } from "../../types/redux";


const BookCategories = ({
    authorization,
    vocabularyCategory,
    vocabularyHiddenTab,
    changeCategory,
    changeHiddenCategory,
}: IBookCategoriesProps) => {
    const changeCategoryLink = (id: number) => {
        changeCategory(id);
        localStorage.setItem(LOCASTORAGE__VOC_CAT, id.toString());
    };

    const changeHiddenCategoryLink = (id: number) => {
        changeHiddenCategory(id);
        localStorage.setItem(LOCASTORAGE__VOC_HIDDEN_TAB, id.toString());
    };

    return (
        <>
            <TabList
                listItems={tabsBookInfo}
                tabClick={changeCategoryLink}
                fildCheckActive={vocabularyCategory}
            >
                {authorization ? (
                    <TabItem
                        pageNumber={NUMBER_HIDDEN_CATEGORY}
                        pageLink={
                            hiddenCategoriesTabsInfo[vocabularyHiddenTab].link
                        }
                        clickFunction={changeCategoryLink}
                        textLink={NAME_HIDDEN_CATEGORY}
                        fildCheckActive={vocabularyCategory}
                    />
                ) : null}
            </TabList>

            {authorization && vocabularyCategory === NUMBER_HIDDEN_CATEGORY ? (
                <TabList
                    listItems={hiddenCategoriesTabsInfo}
                    tabClick={changeHiddenCategoryLink}
                    fildCheckActive={vocabularyHiddenTab}
                />
            ) : null}
        </>
    );
};

const mapStateToProps = ({
    user: { authorization },
    pages: { vocabularyHiddenTab, vocabularyCategory },
}: IState) => ({
    authorization,
    vocabularyHiddenTab,
    vocabularyCategory,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeCategory: (id: number) => {
            dispatch(changeVocabularyCategory(id));
        },
        changeHiddenCategory: (id: number) => {
            dispatch(changeHiddenTabName(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCategories);
