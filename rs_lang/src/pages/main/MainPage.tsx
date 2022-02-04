import React from "react";

import AdvantegesSection from "./sections/AdvantegesSection";
import TeamSection from "./sections/TeamSection";
import TopSection from "./sections/TopSection";

import "./index.scss";

const MainPage = () => {
    return (
        <>
            <TopSection />
            <AdvantegesSection />
            <TeamSection />
        </>
    );
};

export default MainPage;
