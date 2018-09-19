const hotJarTrackingCode = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};' +
  'h._hjSettings={hjid:734967,hjsv:6};' +
  "a=o.getElementsByTagName('head')[0];" +
  "r=o.createElement('script');r.async=1;" +
  'r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;' +
  'a.appendChild(r);' +
  "})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`

const googleTagManagerCode = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-112179323-1');
`

const mixpanelToken = `7d83001be784f09b212b9b3274e41530`

const uppyConfig = {
  debug: true,
  autoProceed: true,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  },
}

const getApiURL = (hostName = global.window && global.window.location.host) => {
  if (!hostName) return process.env.monolithExternalApi
  let apiURL
  if (hostName.includes('localhost')) {
    apiURL = 'api.dev2.kauri.io'
  } else if (hostName.includes('beta')) {
    apiURL = (global.window)
      ? `api.beta.kauri.io`
      : apiURL = `monolith.uat:8080`
  } else {
    const env = hostName.split('.')[0]
    apiURL = (global.window)
      ? `api.${env}.kauri.io`
      : apiURL = `monolith.${env}:8080`
  }

  // Local config override if exists
  const localConfig = require('./local.js')
  if (typeof localConfig.apiURL === 'string') apiURL = localConfig.apiURL

  return apiURL
}

module.exports = {
  ethUsdPriceEndpoint: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  subCategories: ['General', 'Tutorial', 'Walkthrough'],
  hotJarTrackingCode,
  googleTagManagerCode,
  mixpanelToken,
  uppyConfig,
  appId: 'kauri',
  clientId: 'kauri-gateway',
  updateArticleWhitelistedAddresses: [
    // Admin
    '0x37648fc15a8365735289e002d65d44d80c505e8b',
    // Josh
    '0x7855bc9e6564a44753a8d291b037135c605e6d8a',
    // Josh 2
    '0x7b88584d0e6a608fa3a8716b0ca1620d61834a0c',
    // Eric
    '0xbfecec47dd8bf5f6264a9830a9d26ef387c38a67',
    // Sina (ETHBerlin)
    '0xC3EF09a2BdEec9De6Ab74cfA0B5491FA4Cd0b7c8',
  ],
  getApiURL,
}
