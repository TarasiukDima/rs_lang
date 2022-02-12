import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PageLinks } from "../../helpers/consts";
import { TSimpleTypeFunction } from "../../types/common";

export interface ICategoriesLinkItem {
    pageNumber: number;
    clickFunction: TSimpleTypeFunction<number>;
}

const CategoriesLinkItem = ({
    pageNumber,
    clickFunction,
}: ICategoriesLinkItem) => {
    const { pathname } = useLocation();
    const numberActiveCategory = Number(pathname.split("/")[2]);
    const activeClassLink =
        numberActiveCategory === pageNumber + 1
            ? "categories__item_link active"
            : "categories__item_link";
    return (
        <li className="categories__item">
            <Link
                className={activeClassLink}
                to={`${PageLinks.bookPage}${pageNumber + 1}/1`}
                onClick={() => clickFunction(pageNumber)}
            >
                {pageNumber + 1}
            </Link>
        </li>
    );
};

export default CategoriesLinkItem;
