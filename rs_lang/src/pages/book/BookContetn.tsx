import React from "react";
import BookListInfo from "./BookListInfo";
import BookTabs from "./BookTabs";
import "./index.scss";

const BookContetn = () => {
    return (
        <>
            <BookTabs/>
            <BookListInfo/>
        </>
    );
};

export default BookContetn;
