import React from "react";
import { Link } from "react-router-dom";
import { FormInfoProps } from "../../types/form";
import "./index.scss";

const FormInfo = ({
    nameClass = "",
    text,
    pageLink,
    textPageLink,
}: FormInfoProps) => {
    const classesText = nameClass
        ? "authorization__info " + nameClass
        : "authorization__info";

    return (
        <p className={classesText}>
            {text}
            <Link to={pageLink}>{textPageLink}</Link>
        </p>
    );
};

export default FormInfo;
