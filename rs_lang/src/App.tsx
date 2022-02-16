import React, { FC } from "react";
import { Provider } from 'react-redux'

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import AudioGame from "./components/audioGame";

import store from './store/store'
import ServiceApi from "./services/services";
import { ApiContextProvider } from "./services/servicesContext";

import './App.scss';

const App: FC = () => {
    const serviceApi = new ServiceApi();
    serviceApi.init();

    return (
        <Provider store={store}>
            <Header />
            <ApiContextProvider value={serviceApi}>
                <Main />
            </ApiContextProvider>
            <Footer />
            <AudioGame />
        </Provider>
    );
};

export default App;
