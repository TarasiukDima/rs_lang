import React from "react";
import ServiceApi from "./services";

const serviceApi = new ServiceApi();
const { Provider: ApiContextProvider, Consumer: ApiContextConsumer } =
    React.createContext(serviceApi);

export { ApiContextProvider, ApiContextConsumer };
