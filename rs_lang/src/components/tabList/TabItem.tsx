import React from "react";
import { Link } from "react-router-dom";
import { ITabItem } from "../../types/common";

const TabItem = ({
    pageNumber,
    pageLink,
    clickFunction,
    fildCheckActive,
    textLink,
}: ITabItem) => {
    const textItem = textLink ? textLink : pageNumber;
    const clazz =
        fildCheckActive === pageNumber
            ? "categories__item_link active"
            : "categories__item_link";
    return (
        <li className="categories__item">
            <Link
                className={clazz}
                to={pageLink}
                onClick={() => clickFunction(pageNumber)}
            >
                {textItem}
            </Link>
        </li>
    );
};

export default TabItem;
