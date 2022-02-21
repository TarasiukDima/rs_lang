import React from "react";
import { SectionProps } from "../../types/common";

const SectionContent = ({ nameClass, children }: SectionProps) => {
    return (
        <section className={nameClass}>
            <div className="wrapper">{children}</div>
        </section>
    );
};

export default SectionContent;
