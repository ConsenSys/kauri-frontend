import React from "react";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../../lib/styled-components";
import themeConfig from "../../lib/theme-config";

import "jest-dom/extend-expect";
import { IReduxState } from "../../lib/Module";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface IReduxTestState<InitialStateType> {
  initialState?: InitialStateType;
  store?: Store<InitialStateType>;
}

const customRender = <InitialStateType extends {}>(
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, "queries"> &
    IReduxTestState<InitialStateType & IReduxState>
) => {
  const store = createStore<InitialStateType>(
    // @ts-ignore
    () => options && options.initialState,
    options && options.initialState
  );

  const AllTheProviders: React.FunctionComponent = ({ children }) => {
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
