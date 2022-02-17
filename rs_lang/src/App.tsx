import React, { FC } from "react";
import { Provider } from "react-redux";
import store from './store/store'
import ServiceApi from "./services/services";
import { ApiContextConsumer, ApiContextProvider } from "./services/servicesContext";

import Header from "./components/header";
import CheckAuthorization from "./checkAuthorization";
import Main from "./components/main";
import Footer from "./components/footer";
import AudioGame from "./components/audioGame";

import './App.scss';

const App: FC = () => {
    const serviceApi = new ServiceApi();
    serviceApi.init();

    return (
        <Provider store={store}>
            <Header />
            <ApiContextProvider value={serviceApi}>
                {/* <ApiContextConsumer>
                    {(serviceApi) => <CheckAuthorization serviceApi={serviceApi} />
                    }
                </ApiContextConsumer> */}

                <Main />
            </ApiContextProvider>
            <Footer />
            <AudioGame />
        </Provider>
    );
};

export default App;
