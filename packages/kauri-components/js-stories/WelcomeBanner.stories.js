import React from "react";
import { storiesOf } from "@storybook/react";
import HomePage from '../components/WelcomeBanner/Homepage';
import OtherPages from '../components/WelcomeBanner/OtherPages';

storiesOf("Welcome Banner", module)
  .add("Home Page", () => (
      <HomePage />
  ))
  .add("Other Pages", () => (
    <OtherPages />
  ));
