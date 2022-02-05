import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../../pages/auth";
import BookPage from "../../pages/book";
import ErrorPage from "../../pages/errorPage";
import GamesPage from "../../pages/games";
import MainPage from "../../pages/main";
import StatisticPage from "../../pages/statistic";
import { PageLinks } from "../../utils";

const Main: FC = () => {
    return (
        <main className="main__content">
            <Routes>
                <Route path={PageLinks.mainPage} element={<MainPage />} />
                <Route path={PageLinks.gamesPage} element={<GamesPage />} />
                <Route path={PageLinks.gameSprintPage} element={<GamesPage />} />
                <Route path={PageLinks.gameAudioPage} element={<GamesPage />} />
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
