import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLinks } from "../../helpers/settings";
import AuthPage from "../../pages/auth";
import BookPage from "../../pages/book";
import ErrorPage from "../../pages/errorPage";
import GamesPage from "../../pages/games";
import MainPage from "../../pages/main";
import OneGame from "../../pages/oneGame";
import StatisticPage from "../../pages/statistic";

const Main: FC = () => {
    return (
        <main className="main__content">
            <Routes>
                <Route path={PageLinks.mainPage} element={<MainPage />} />
                <Route path={PageLinks.gamesPage} element={<GamesPage />} />
                <Route path={PageLinks.gameSprintPage} element={<OneGame />} />
                <Route path={PageLinks.gameAudioPage} element={<OneGame />} />
                <Route path={PageLinks.bookPage} element={<BookPage />} />
                <Route path={PageLinks.statisticPage} element={<StatisticPage />}/>
                <Route path={PageLinks.authPage} element={<AuthPage />} />
                <Route path={PageLinks.loginPage} element={<AuthPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
    );
};

export default Main;
