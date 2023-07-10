import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "tailwindcss/tailwind.css";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>,
  document.getElementById("root"),
);
