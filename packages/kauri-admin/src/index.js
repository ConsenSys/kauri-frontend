// @flow
import { setConfig } from "react-hot-loader";
import React from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "react-web3";
import App from "./App";

setConfig({
  ignoreSFC: !!ReactDOM.setHotElementComparator,
  pureSFC: true,
  pureRender: true,
});

render(
  <Web3Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3Provider>,
  document.getElementById("root"),
);
