import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

import School from "./School";
import { persistor, store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <App /> */}
        <School />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
