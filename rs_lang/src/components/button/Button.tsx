import React from "react";
import { ButtonProps } from "../../types/common";

import "./index.scss";


const ButtonEl = ({
    nameClass = "",
    children,
    onclick,
    disable = false,
}: ButtonProps) => {
    const classesText = nameClass ? "button " + nameClass : "button";

    return (
        <button className={classesText} onClick={onclick} disabled={disable}>
            <span>{children}</span>
        </button>
    );
};

export default ButtonEl;
