import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../../pages/auth";
import BookPage from "../../pages/book";
import MainPage from "../../pages/main";
import StatisticPage from "../../pages/statistic";
import { PageLinks } from "../../utils";

import "./index.scss";

const Main: FC = () => {
    return (
        <main className="main__content">
            <div className="wrapper">
                <Routes>
                    <Route path={PageLinks.mainPage} element={<MainPage />} />
                    <Route path={PageLinks.bookPage} element={<BookPage />} />
                    <Route path={PageLinks.statisticPage} element={<StatisticPage />}/>
                    <Route path={PageLinks.authPage} element={<AuthPage />} />
                    <Route path="*" element={<MainPage />} />
                </Routes>
            </div>
        </main>
    );
};

export default Main;
