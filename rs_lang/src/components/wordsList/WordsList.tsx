import React, { useState } from "react";
import WordsItem from "./WordsItem";
import { ApiContextConsumer } from "../../services/servicesContext";

import { IWordsListProps, IWordItemObj } from "../../types/book";
import { TSimpleTypeFunction } from "../../types/common";

import "./index.scss";

const WordsList = ({ bookListInfoArr }: IWordsListProps) => {
    const [countLearnedEl, setCountLearnedEl] = useState(20);
    const [coutnSecond, setCoutnSecond] = useState(false);
    if (!bookListInfoArr.length) return null;

    const changeCountLearnedItems: TSimpleTypeFunction<number> = (
        count: number
    ): void => {
        if (coutnSecond) {
            setCountLearnedEl((countLearnedEl) => countLearnedEl + count);
        }

        if (!coutnSecond && count < 0) {
            setCountLearnedEl((countLearnedEl) => countLearnedEl + count);
        }
    };

    // const data = async () => {
    //     const result = await getUserAggregatedWords(
    //         "620638e3978b5a001610858a",
    //         `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDYzOGUzOTc4YjVhMDAxNjEwODU4YSIsImlhdCI6MTY0NDc4NTUxMiwiZXhwIjoxNjQ0Nzk5OTEyfQ.lTA43-_JtcVDFkFHMH2LSRXATZ3cRWS8NFa7FQfVgn0`,
    //     );
    //     console.log(result);

    //     return result
    // }
    // console.log(data());

    const listClassNames =
        countLearnedEl >= 20 ? "words__list learned__list" : "words__list";

    return (
        <ul className={listClassNames}>
            {bookListInfoArr.map((bookItemInfo: IWordItemObj) => {
                return (
                    <ApiContextConsumer key={bookItemInfo.id}>
                        {(serviceApi) => (
                            <WordsItem
                                changeCountLearnedItems={
                                    changeCountLearnedItems
                                }
                                setCoutnSecond={setCoutnSecond}
                                serviceApi={serviceApi}
                                {...bookItemInfo}
                            />
                        )}
                    </ApiContextConsumer>
                );
            })}
        </ul>
    );
};

export default WordsList;
