import React from "react";
import PaginationItem from "./PaginationItem";

import { IPaginationPageProps } from "../../types/pagination";
import "./index.scss";
import { checkValue } from "../../utils";

const PaginationPage = ({
    activePage,
    clickButton,
    countPages,
}: IPaginationPageProps) => {
    if (countPages <= 1) return null;

    const paginationsArr = [];

    // start
    checkValue(activePage - 3, 1, "more")
        ? paginationsArr.push({ textPage: "start", numberPage: 1 })
        : null;
    // -2
    checkValue(activePage - 2, 1, "more")
        ? paginationsArr.push({
              textPage: activePage - 2,
              numberPage: activePage - 2,
          })
        : null;
    // -1
    checkValue(activePage - 1, 1, "more")
        ? paginationsArr.push({
              textPage: activePage - 1,
              numberPage: activePage - 1,
          })
        : null;
    // active
    paginationsArr.push({
        textPage: activePage,
        numberPage: activePage,
        active: true,
    });

    // +1
    checkValue(activePage + 1, countPages, "less")
        ? paginationsArr.push({
              textPage: activePage + 1,
              numberPage: activePage + 1,
          })
        : null;
    // +2
    checkValue(activePage + 2, countPages, "less")
        ? paginationsArr.push({
              textPage: activePage + 2,
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
                        clickButton={clickButton}
                    />
                );
            })}
        </ul>
    );
};

export default PaginationPage;
