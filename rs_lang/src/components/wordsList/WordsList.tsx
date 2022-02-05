import React from "react";
import WordsItem from "./WordsItem";

import "./index.scss";
import { IWordsListProps, IWordItemObj } from "../../types/book";

const WordsList = ({ bookListInfoArr, clickButton }: IWordsListProps) => {

    return (
        <ul className="words__list">
            {bookListInfoArr.map((bookItemInfo: IWordItemObj) => (
                <WordsItem
                    key={bookItemInfo.id}
                    {...bookItemInfo}
                    clickButton={clickButton}
                />
            ))}
        </ul>
    );
};

export default WordsList;
