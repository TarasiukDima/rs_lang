import React from "react";

import AdvantegesSection from "./sections/AdvantegesSection";
import GamesSection from "./sections/GamesSection";
import TeamSection from "./sections/TeamSection";
import TopSection from "./sections/TopSection";

import "./index.scss";

const MainPage = () => {
    return (
        <>
            <TopSection />
            <GamesSection/>
            <AdvantegesSection />
            <TeamSection />
        </>
    );
};

export default MainPage;
