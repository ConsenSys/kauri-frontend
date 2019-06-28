import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../../lib/styled-components";
import themeConfig from "../../lib/theme-config";

import "jest-dom/extend-expect";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
};

const customRender = (ui, options?: Omit<RenderOptions, "queries">) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
