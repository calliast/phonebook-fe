import React from "react";
import { createRoot } from "react-dom/client";
import "./view/styles/index.css";
import App from "./view/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>/
    <App />
    {/* <UserBox /> */}
    </Provider>/
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals