import React from "react";
import { NEXT_PAGINGATION_TEXT, PREV_PAGINGATION_TEXT } from "../../helpers/consts";
import { IPaginationItemProps } from "../../types/pagination";

import "./index.scss";

const PaginationItem = ({
    numberPage,
    textPage,
    clickButton,
    active = false,
}: IPaginationItemProps) => {
    const buttonClass = active
        ? "pagination__button active"
        : "pagination__button";
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

    return (
        <li className="pagination__item">
            <button
                className={buttonClass}
                onClick={() => clickButton(numberPage)}
                // Learn how I can do it without this
                dangerouslySetInnerHTML={{ __html: contentButton }}
            />
        </li>
    );
};

export default PaginationItem;
