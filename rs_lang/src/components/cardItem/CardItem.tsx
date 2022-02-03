import React from "react";
import "./index.scss";

type ButtonClickFunction = () => void;

interface CardProps {
    title: string;
    img: string;
    description: string;
    nameClassItem?: string;
    nameClassButton?: string;
    onclick?: ButtonClickFunction;
}

const CardItem = ({
    title,
    img,
    description,
    nameClassItem = "",
}: CardProps) => {
    const classesText = nameClassItem ? "list__item " + nameClassItem : "list__item";

    return (
        <li className={classesText}>
            <p className="item__title">{title}</p>
            <div className="img__wrap">
                <img src={img} alt={title} />
            </div>
            <p className="item__description">{description}</p>
        </li>
    );
};

export default CardItem;
