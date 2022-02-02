import React, { FC } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

import './App.scss';

const App: FC = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};

export default App;
