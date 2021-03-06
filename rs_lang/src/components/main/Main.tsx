import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import AuthPage from "../../pages/auth";
import BookPage from "../../pages/book";
import ErrorPage from "../../pages/errorPage";
import GamesPage from "../../pages/games";
import MainPage from "../../pages/main";
import OneGame from "../../pages/oneGame";
import StatisticPage from "../../pages/statistic";

import { PageLinks } from "../../helpers/consts";


const Main: FC = () => {
    return (
        <main className="main__content">
            <Routes>
                <Route path={PageLinks.mainPage} element={<MainPage />} />
                <Route path={PageLinks.gamesPage} element={<GamesPage />} />
                <Route path={PageLinks.gameSprintPage} element={<OneGame />} />
                <Route path={PageLinks.gameAudioPage} element={<OneGame />} />
                <Route
                    path={PageLinks.bookPage + ":categoryid/:pageid"}
                    element={<BookPage />}
                />
                <Route
                    path={PageLinks.vocabularyPage + ":categoryid"}
                    element={<BookPage />}
                />
                <Route
                    path={PageLinks.statisticPage + ":tabid"}
                    element={<StatisticPage />}
                />
                <Route path={PageLinks.authPage} element={<AuthPage />} />
                <Route path={PageLinks.loginPage} element={<AuthPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
    );
};

export default Main;
