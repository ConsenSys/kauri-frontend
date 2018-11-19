interface IColors {
  [key: string]: string;
  padding: string;
  paddingTop: string;
  primaryColor: string;
  secondaryColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  hoverTextColor: string;
  disabledTextColor: string;
  tertiaryBackgroundColor: string;
  disabledBackgroundColor: string;
  contentBorder: string;
  errorRedColor: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryBlue: string;
  secondaryBlueDark: string;
  white: string;
  divider: string;
  borderTextArea: string;
}

type FontSizes = number[];

type FontWeight = Array<number | string>;

type Breakpoints = string[];

type Space = number[];

export interface IThemeInterface {
  space: Space;
  fontSizes: FontSizes;
  fontWeight: FontWeight;
  breakpoints: Breakpoints;
  colors: IColors;
  bg: IColors;
  padding: string;
  paddingTop: string;
}

const theme: IThemeInterface;

export default theme;
