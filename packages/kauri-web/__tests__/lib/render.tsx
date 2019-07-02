import React from "react";
import createMockStore, { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../../lib/styled-components";
import themeConfig from "../../lib/theme-config";
import ReactGA from "react-ga";

import "jest-dom/extend-expect";

import { IReduxState } from "../../lib/Module";

ReactGA.initialize("UA-XXXX-XX", {
  testMode: true,
});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface IReduxTestState<InitialStateType> {
  initialState?: InitialStateType;
  store?: MockStore<InitialStateType>;
}

const customRender = <InitialStateType extends {}>(
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, "queries"> &
    IReduxTestState<InitialStateType & IReduxState>
) => {
  const store = createMockStore<InitialStateType>()(
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
