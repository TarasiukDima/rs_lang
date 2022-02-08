import React, { FC } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

import { Provider } from 'react-redux'
import store from './store/store'

import './App.scss';
import AudioGame from "./components/audioGame";

const App: FC = () => {
    return (
        <Provider store={store}>
            <Header />
            <Main />
            <Footer />
            <AudioGame />
        </Provider>
    );
};

export default App;
