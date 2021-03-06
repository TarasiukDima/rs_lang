import React from "react";
import PaginationItem from "./PaginationItem";

import { checkValue } from "../../helpers/utils";
import { IPaginationPageProps } from "../../types/pagination";

import "./index.scss";

const PaginationPage = ({ activePage, countPages }: IPaginationPageProps) => {
    if (countPages <= 1) return null;

    const paginationsArr = [];

    // start
    checkValue(activePage - 3, 0, "more")
        ? paginationsArr.push({ textPage: "start", numberPage: 0 })
        : null;
    // -2
    checkValue(activePage - 2, 0, "more")
        ? paginationsArr.push({
              textPage: activePage - 1,
              numberPage: activePage - 2,
          })
        : null;
    // -1
    checkValue(activePage - 1, 0, "more")
        ? paginationsArr.push({
              textPage: activePage,
              numberPage: activePage - 1,
          })
        : null;
    // active
    paginationsArr.push({
        textPage: activePage + 1,
        numberPage: activePage,
    });

    // +1
    checkValue(activePage + 1, countPages, "less")
        ? paginationsArr.push({
              textPage: activePage + 2,
              numberPage: activePage + 1,
          })
        : null;
    // +2
    checkValue(activePage + 2, countPages, "less")
        ? paginationsArr.push({
              textPage: activePage + 3,
              numberPage: activePage + 2,
          })
        : null;
    // end
    checkValue(activePage + 3, countPages, "less")
        ? paginationsArr.push({ textPage: "end", numberPage: countPages })
        : null;

    return (
        <ul className="pagination__list">
            {paginationsArr.map((paginationInfo) => {
                return (
                    <PaginationItem
                        key={paginationInfo.textPage}
                        {...paginationInfo}
                    />
                );
            })}
        </ul>
    );
};

export default PaginationPage;
