import React from "react";
import { storiesOf } from "@storybook/react";
import MainBanner from '../components/WelcomeBanner/MainBanner';
import MobileBanner from '../components/WelcomeBanner/MobileBanner';

storiesOf("Welcome Banner", module)
  .add("Home Page", () => (
      <MainBanner />
  ))
  .add("Other Pages", () => (
    <MobileBanner />
  ));
