import React from "react";
import SectionContent from "../../components/section";
import BookContetn from "./BookContetn";
import "./index.scss";

const BookPage = () => {
    return (
        <SectionContent nameClass="book__section">
            <h1 className="title">Словарь</h1>
            <BookContetn/>
        </SectionContent>
    );
};

export default BookPage;
