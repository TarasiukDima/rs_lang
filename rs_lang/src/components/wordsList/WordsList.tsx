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

    const listClassNames =
        countLearnedEl >= 20 ? "words__list learned__list" : "words__list";

    return (
        <ul className={listClassNames}>
            {bookListInfoArr.map((bookItemInfo: IWordItemObj) => {
                let idItem = "";
                let endProps = {};
                if (bookItemInfo.id) {
                    const { id, ...end } = bookItemInfo;
                    idItem = id;
                    endProps = { ...end };
                } else {
                    const { _id, ...end } = bookItemInfo;
                    idItem = _id as string;
                    endProps = { ...end };
                }

                return (
                    <ApiContextConsumer key={idItem}>
                        {(serviceApi) => (
                            <WordsItem
                                changeCountLearnedItems={
                                    changeCountLearnedItems
                                }
                                id={idItem}
                                setCoutnSecond={setCoutnSecond}
                                serviceApi={serviceApi}
                                {...endProps as Omit<IWordItemObj, "id">}
                            />
                        )}
                    </ApiContextConsumer>
                );
            })}
        </ul>
    );
};

export default WordsList;
