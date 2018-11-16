import * as styledComponents from "styled-components";

import { IThemeInterface } from "./theme-config";

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, keyframes, ThemeProvider };
export default styled;
