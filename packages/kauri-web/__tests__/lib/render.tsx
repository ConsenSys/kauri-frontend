import React from "react";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../../lib/styled-components";
import themeConfig from "../../lib/theme-config";

import "jest-dom/extend-expect";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface IReduxTestState<InitialStateType> {
  initialState?: InitialStateType;
  store?: Store<InitialStateType>;
}

const customRender = <InitialStateType extends {}>(
  ui,
  options?: Omit<RenderOptions, "queries"> & IReduxTestState<InitialStateType>
) => {
  const store = createStore<InitialStateType>(
    () => options && options.initialState,
    options && options.initialState
  );

  const AllTheProviders = ({ children }) => {
    return (
      <ThemeProvider theme={themeConfig}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  };

  return {
    ...render(ui, {
      wrapper: AllTheProviders,
      ...options,
    }),
    store,
  };
};

export * from "@testing-library/react";
export { customRender as render };
