import React from "react";
import { ILabelForm } from "../../types/form";
import './index.scss';

const LabelForm = ({
    nameClass,
    errorText,
    children,
}: ILabelForm) => {
    const classesText = nameClass ? "label " + nameClass : "label";
    return (
        <label className={classesText}>
            { children }
            {errorText && <p className="error__text">{errorText}</p>}
        </label>
    );
};

export default LabelForm;
