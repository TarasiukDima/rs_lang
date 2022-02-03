import React from 'react';
import "./index.scss";

type ButtonClickFunction = () => void;
interface ButtonProps {
    children: JSX.Element | Array<JSX.Element> | string;
    nameClass?: string;
    onclick?: ButtonClickFunction;
}

const ButtonEl = ({ nameClass = '', children, onclick }: ButtonProps) => {
    const classesText = nameClass ? 'button ' + nameClass : 'button';

    return (
        <button
            className={classesText}
            onClick={onclick}
        >
            <span>
                {children}
            </span>
        </button>
    );
};

export default ButtonEl;
