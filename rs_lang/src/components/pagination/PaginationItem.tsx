import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import {
    LOCASTORAGE__VOC_PAG,
    NEXT_PAGINGATION_TEXT,
    PageLinks,
    PREV_PAGINGATION_TEXT,
} from "../../helpers/consts";
import { changeVocabularyPage } from "../../store/actions/actionsPages";
import { TSimpleTypeFunction } from "../../types/common";
import { IPaginationItemProps } from "../../types/pagination";
import { IAction, IState } from "../../types/redux";


const PaginationItem = ({
    vocabularyPage,
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

    const clickPaginationButton: TSimpleTypeFunction<number> = (id: number) => {
        if (id === vocabularyPage) return;
        changePage(id);
        localStorage.setItem(LOCASTORAGE__VOC_PAG, id.toString());
    };

    const clazz =
        numberPage === vocabularyPage
            ? "pagination__button active"
            : "pagination__button";

    return (
        <li className="pagination__item">
            <Link
                onClick={() => clickPaginationButton(numberPage)}
                className={clazz}
                to={`${PageLinks.bookPage}${vocabularyCategory + 1}/${
                    numberPage + 1
                }`}
            >
                <span dangerouslySetInnerHTML={{ __html: contentButton }} />
            </Link>
        </li>
    );
};

const mapStateToProps = ({
    pages: { vocabularyCategory, vocabularyPage },
}: IState) => ({
    vocabularyCategory,
    vocabularyPage,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changePage: (id: number) => {
            dispatch(changeVocabularyPage(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationItem);
