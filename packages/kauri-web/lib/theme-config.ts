export const metamask = {
  borderColor: "#93949D",
  description: `MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.`,
  homepageURL: "https://metamask.io",
  id: "metamask",
  name: "Metamask",
  primaryColor: "#93949D",
};

// export const ethereum = {
//   primaryColor: '#132026',
//   borderColor: '#132026',
//   homepageURL: 'https://www.ethereum.org',
// }

export const uport = {
  borderColor: "#5147c3",
  description: `uPort returns ownership of identity to the individual. uPort's open identity system allows users to register their own identity on Ethereum, send and request credentials, sign transactions, and securely manage keys & data.`,
  homepageURL: "https://uport.me",
  id: "uport",
  name: "uPort",
  primaryColor: "#5147c3",
};

export const kauri = {
  borderColor: "#0ba986",
  description: `Decentralized Technical Knowledge Base for the Ethereum Ecosystem`,
  homepageURL: "https://www.kauri.io",
  id: "kauri",
  name: "Kauri",
  primaryColor: "#0ba986",
};

export const aragon = {
  borderColor: "#1D1F1F",
  description: `Aragon is a project that aims to disintermediate the creation and maintenance of organizational structures by using blockchain technology. We want to empower people across the world to easily and securely manage their organizations. We provide the tools for anyone to become an entrepreneur and run their own organization, to take control of their own lives`,
  homepageURL: "https://aragon.one",
  id: "aragon",
  name: "Aragon",
  primaryColor: "#1D1F1F",
};

export const dharma = {
  borderColor: "#0F2224",
  description: `Dharma is a platform for building borderless lending products using programmable, tokenized debt. `,
  homepageURL: "https://dharma.io",
  id: "dharma",
  name: "Dharma",
  primaryColor: "#0F2224",
};

export const ens = {
  borderColor: "#55A558",
  description: `ENS offers a secure & decentralised way to address resources both on and off the blockchain using simple, human-readable names.`,
  homepageURL: "https://ens.domains/",
  id: "ens",
  name: "ENS",
  primaryColor: "#55A558",
};

export const makerdao = {
  borderColor: "#5A6876",
  description: `Dai is a cryptocurrency that is price stabilized against the value of the U.S. Dollar. Dai is created by the Dai Stablecoin System, a decentralized platform that runs on the Ethereum blockchain.`,
  homepageURL: "https://makerdao.com/",
  id: "makerdao",
  name: "MakerDAO",
  primaryColor: "#5A6876",
};

export const remix = {
  borderColor: "#b3b3b3",
  description: `Remix is a browser-based compiler and IDE that enables users to build Ethereum contracts with Solidity language and to debug transactions.`,
  homepageURL: "https://github.com/ethereum/remix",
  id: "remix",
  name: "Remix",
  primaryColor: "#b3b3b3",
};

export const toshi = {
  borderColor: "#000000",
  description: `Toshi is a browser for the Ethereum network that provides universal access to financial services. `,
  homepageURL: "https://www.toshi.org/",
  id: "toshi",
  name: "Toshi",
  primaryColor: "#000000",
};

export const zeppelin = {
  borderColor: "#3566B2",
  description: `ZeppelinOS is an open-source, distributed platform of tools and services on top of the EVM to develop and manage smart contract applications securely.`,
  homepageURL: "https://zeppelinos.org/",
  id: "zeppelin",
  name: "Zeppelin",
  primaryColor: "#3566B2",
};

export const categories = Object.keys({
  aragon,
  dharma,
  ens,
  kauri,
  makerdao,
  metamask,
  // ethereum,
  remix,
  toshi,
  uport,
  zeppelin,
});

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

const colors: IColors = {
  bgPrimary: "#1E2428",
  bgSecondary: "#1E3D3B",
  borderTextArea: "#979797",
  contentBorder: "1px solid rgba(30, 36, 40, 0.19)",
  disabledBackgroundColor: "#D6D6D6",
  disabledTextColor: "#9B9B9B",
  divider: "#EBEBEB",
  errorRedColor: "#C03030",
  hoverTextColor: "#108E72",
  padding: "calc((100vw - 1280px) / 2)",
  paddingTop: "2.5em",
  primary: "#0BA986",
  primaryColor: "#0BA986",
  primaryDark: "#11856B",
  primaryTextColor: "#1E2428",
  secondary: "#11856B",
  secondaryBlue: "rgb(81, 123, 162, 1)",
  secondaryBlueDark: "rgb(81, 118, 142, 1)",
  secondaryColor: "#1E3D3B",
  secondaryTextColor: "#283035",
  tertiaryBackgroundColor: "#F7F7F7",
  textPrimary: "#1E2428",
  white: "#FFFFFF",
};

const fontSizes: FontSizes = [11, 13, 14, 16, 18, 20, 22, 28];

const fontWeight: FontWeight = [300, "normal", 500, 700];

const breakpoints: Breakpoints = ["500px", "52em", "64em"];

const space: Space = [0, 10, 15, 30, 60];

const themeConfig = {
  bg: colors,
  breakpoints,
  colors,
  fontSizes,
  fontWeight,
  space,
  ...colors, // TODO: Deprecate across the app
  padding: "calc((100vw - 1280px) / 2)",
  paddingTop: "2.5em",
};

export type IThemeInterface = typeof themeConfig;

export default themeConfig;
