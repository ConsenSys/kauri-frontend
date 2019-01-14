import React from "react";
import { storiesOf } from "@storybook/react";
import MainBanner from "../components/WelcomeBanner/MainBanner";
import MobileBanner from "../components/WelcomeBanner/MobileBanner";

storiesOf("Welcome Banner", module)
  .add("Home Page", () => (
    <MainBanner
      handleClose={() => alert("learn more")}
      handleLearnMore={() => alert("learn more")}
    />
  ))
  .add("Other Pages", () => (
    <MobileBanner
      handleClose={() => alert("learn more")}
      handleLearnMore={() => alert("learn more")}
    />
  ));
