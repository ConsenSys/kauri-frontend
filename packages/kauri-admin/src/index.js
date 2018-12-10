// @flow
import React from "react";
import { setConfig } from "react-hot-loader";
import { render } from "react-dom";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "react-web3";
import App from "./App";

setConfig({
  ignoreSFC: true,
});

render(
  <Web3Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3Provider>,
  document.getElementById("root"),
);
