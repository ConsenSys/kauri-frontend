const cloudImageId = "asdgvdoyen";

const hotJarTrackingCode = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:734967,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`;

const googleTagManagerCode = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-112179323-1');
`;

const mixpanelToken = "7d83001be784f09b212b9b3274e41530";

const uppyConfig = {
  debug: true,
  autoProceed: true,
  restrictions: {
    maxFileSize: 10000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  },
};

const getApiURL = (hostName = process.env.monolithExternalApi) => {
  // localhost or mobile
	if (hostName.includes('192') || hostName.includes('localhost')) {
		return process.env.monolithExternalApi;
	}
  let apiURL;
  const env = hostName.split(".")[1];
  // Use internal k8s dns if not browser
  if (global.window) {
    apiURL = process.env.monolithExternalApi;
  } else {
    apiURL = process.env.monolithApi;
  }

  // Local config override if exists
  const localConfig = require("./local.js");
  if (typeof localConfig.apiURL === "string") apiURL = localConfig.apiURL;

  return apiURL;
};

module.exports = {
  ethUsdPriceEndpoint:
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
  subCategories: ["General", "Tutorial", "Walkthrough"],
  hotJarTrackingCode,
  googleTagManagerCode,
  mixpanelToken,
  uppyConfig,
  appId: "kauri",
  clientId: "kauri-gateway",
  updateArticleWhitelistedAddresses: [
    // Admin
    "0x37648fc15a8365735289e002d65d44d80c505e8b",
    // Josh
    "0x7855bc9e6564a44753a8d291b037135c605e6d8a",
    // Josh 2
    "0x7b88584d0e6a608fa3a8716b0ca1620d61834a0c",
    // Eric
    "0xbfecec47dd8bf5f6264a9830a9d26ef387c38a67",
    // Sina (ETHBerlin)
    "0xC3EF09a2BdEec9De6Ab74cfA0B5491FA4Cd0b7c8",
  ],
  getApiURL,
  cloudImageId,
  testingAccounts: [
    "b282635ffc0ea4d6984f6b50e9dab90de1d03ce2",
    "5765d2d2fafb930132d72651f3f28c86371379b1",
    "27e77e164bc02788f347213b0a3e9a9a0cdf8d7a",
  ],
};
