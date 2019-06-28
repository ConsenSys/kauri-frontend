import React from "react";
import { createStore, Store, Reducer } from "redux";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../../lib/styled-components";
import themeConfig from "../../lib/theme-config";

import "jest-dom/extend-expect";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const AllTheProviders = ({ store }) => ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;
    </Provider>
  );
};

interface IReduxTestState<InitialStateType> {
  initialState?: InitialStateType;
  store?: Store<InitialStateType>;
}

const customRender = <InitialStateType extends {}>(
  ui,
  options?: Omit<RenderOptions, "queries"> & IReduxTestState<InitialStateType>
) => {
  const store = createStore<InitialStateType>(
    () => options.initialState,
    options && options.initialState
  );

  return {
    ...render(ui, {
      wrapper: AllTheProviders({ store }),
      ...options,
    }),
    store,
  };
};

export * from "@testing-library/react";
export { customRender as render };
