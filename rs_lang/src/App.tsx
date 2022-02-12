import React, { FC, useEffect } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import AudioGame from "./components/audioGame";

import { Provider } from 'react-redux'
import store from './store/store'

import './App.scss';

const App: FC = () => {
    useEffect(() => {
        // const localObj = localStorage.getItem(LOCASTORAGE__NAME);
        // console.log(store);

    },[])
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
