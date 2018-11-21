import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import "storybook-chromatic";
import themeConfig from "../lib/theme-config";

addDecorator(story => (
  <ThemeProvider theme={themeConfig}>{story()}</ThemeProvider>
));

function loadStories() {
  const jsreq = require.context("../js-stories", true, /.stories.js$/);
  jsreq.keys().forEach(filename => jsreq(filename));
  const tsreq = require.context("../js-stories", true, /.stories.tsx$/);
  tsreq.keys().forEach(filename => tsreq(filename));
}

configure(loadStories, module);
