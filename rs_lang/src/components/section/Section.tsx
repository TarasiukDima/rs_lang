import React, { FC } from 'react';

const SectionContent: FC = ({children}) => {
    return (
        <section>
            <div className="wrapper">
                {children}
            </div>
        </section>
    );
};

export default SectionContent;
