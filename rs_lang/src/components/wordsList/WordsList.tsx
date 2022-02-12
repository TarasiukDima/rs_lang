import React from "react";
import WordsItem from "./WordsItem";

import "./index.scss";
import { IWordsListProps, IWordItemObj } from "../../types/book";

const WordsList = ({ bookListInfoArr, clickButton, authorization }: IWordsListProps) => {
    if (!bookListInfoArr.length) return null;

    return (
        <ul className="words__list learned__list">
            {bookListInfoArr.map((bookItemInfo: IWordItemObj) => (
                <WordsItem
                    key={bookItemInfo.id}
                    {...bookItemInfo}
                    clickButton={clickButton}
                    authorization={authorization}
                />
            ))}
        </ul>
    );
};

export default WordsList;
