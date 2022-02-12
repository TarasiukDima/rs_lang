import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";
import {
    NEXT_PAGINGATION_TEXT,
    PageLinks,
    PREV_PAGINGATION_TEXT,
} from "../../helpers/consts";
import {
    changeVocabularyCategory,
    changeVocabularyPage,
} from "../../store/actions/actionsVocabulary";
import { TTabClickFC } from "../../types/common";
import { IPaginationItemProps } from "../../types/pagination";
import { IAction, IState } from "../../types/redux";

import "./index.scss";

const PaginationItem = ({
    numberPage,
    textPage,
    vocabularyCategory,
    changePage,
}: IPaginationItemProps) => {
    let contentButton: string | number;
    switch (textPage) {
        case "start":
            contentButton = PREV_PAGINGATION_TEXT || "&#171;";
            break;
        case "end":
            contentButton = NEXT_PAGINGATION_TEXT || "&#187;";
            break;
        default:
            contentButton = textPage.toString();
    }

    const clickPaginationButton: TTabClickFC = (id) => {
        changePage(id);
    };

    return (
        <li className="pagination__item">
            <NavLink
                onClick={() => clickPaginationButton(numberPage)}
                className="pagination__button"
                to={`${PageLinks.bookPage}${vocabularyCategory + 1}/${
                    numberPage + 1
                }`}
            >
                <span dangerouslySetInnerHTML={{ __html: contentButton }}/>
            </NavLink>
        </li>
    );
};

const mapStateToProps = ({ vocabulary: { vocabularyCategory } }: IState) => ({
    vocabularyCategory,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changePage: (pageNumber: number) => {
            dispatch(changeVocabularyPage(pageNumber));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationItem);
