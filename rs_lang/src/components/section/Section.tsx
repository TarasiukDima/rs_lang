import React from 'react';

interface SectionProps {
    nameClass: string;
    children: JSX.Element | Array<JSX.Element> | string;
}

const SectionContent = ({nameClass, children}: SectionProps) => {
    return (
        <section className={nameClass}>
            <div className="wrapper">
                {children}
            </div>
        </section>
    );
};

export default SectionContent;
