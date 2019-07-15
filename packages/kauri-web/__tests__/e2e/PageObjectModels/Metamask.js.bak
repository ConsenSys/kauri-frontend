import PageObjectModel from "./PageObjectModel";
const config = require("../../../config").default;

export default class Metamask extends PageObjectModel {
  extensionId = "nkbihfbeogaeaoehlefnkodbefgpgknn";

  constructor(driver) {
    super(driver);
    this.driver = driver;
  }

  async openMetamaskFullpage() {
    await this.driver.url(`chrome-extension://${this.extensionId}/popup.html`);
    await this.switchTab(0);
    await this.pause(3000);
    // await this.driver.waitUntil(async () => {
    //   const title = await this.driver.getTitle()
    //   return title === 'Metamask'
    // }, 5000)
    await this.driver.waitForVisible(".terms-header", 50000);
  }

  async getTermsHeaderText() {
    const privacyNoticeText = await this.driver.getText(".terms-header");
    return privacyNoticeText[0];
  }

  async acceptTerms() {
    await this.driver.click("button:first-of-type");
    await this.pause(1000);
    await this.driver.execute(`
      const attributions = document.querySelector('#app-content > div > div.app-primary.from-right > div > div > div > p:nth-child(89) > strong > a');
      attributions.scrollIntoView(true);
    `);
    await this.driver.isEnabled("button:first-of-type");
    await this.driver.click("button:first-of-type");
    await this.pause(1000);
  }

  async enterPasswords() {
    await this.driver.setValue("#password-box", "123456789");
    await this.driver.setValue("#password-box-confirm", "123456789");
    await this.driver.click("button:first-of-type");
    await this.driver.waitForExist(".twelve-word-phrase");
  }

  async confirmSeedwords() {
    this.seedPhrase = await this.driver.getText(".twelve-word-phrase");
    console.log(this.seedPhrase);
    global.seedPhase = this.seedPhrase;
    await this.driver.click("button:first-of-type");
  }

  async transactionsVisible() {
    await this.pause(1000);
    const isVisible = await this.driver.isVisible(".transaction-list");
    return isVisible;
  }

  async switchToRinkebyNetwork() {
    await this.driver.click(".network-indicator");
    await this.driver.click('//*[@id="app-content"]/div/div[2]/span/div/li[4]');
  }

  async switchToKauriDev() {
    await this.driver.click(".network-indicator");
    await this.pause(1000);
    await this.driver.click(
      "#app-content > div > div:nth-child(2) > span > div > li:nth-child(7)"
    );
    await this.driver.setValue("#new_rpc", "http://" + config.gethBlockchain);
    await this.driver.click("button:first-of-type");
    await this.driver.waitUntil(async () => {
      const title = await this.driver.getText(".network-name");
      return title !== "Main Network";
    }, 5000);
    const currentNetworkName = await this.driver.getText(".network-name");
    await this.driver.click(".fa.fa-arrow-left");
    await this.driver.waitForText("h2");
    await this.pause(1000);
    return currentNetworkName;
  }

  async importAccount(privateKey) {
    await this.driver.click(".accounts-selector");
    await this.pause(1000);
    await this.driver.click(
      "#app-content > div > div.full-width > div > div:nth-child(2) > span > div > div > span > div > li:nth-child(4)"
    );
    await this.driver.setValue("#private-key-box", config.devAccountPrivateKey);
    await this.driver.click("button.primary");
    await this.driver.waitForText("h2");
    const accountName = await this.driver.getText("h2");
    return accountName;
  }

  async setupEnvironment() {
    await this.openMetamaskFullpage();
    await this.getTermsHeaderText();
    await this.acceptTerms();
    await this.enterPasswords();
    await this.confirmSeedwords();
    // const transactionsVisible = await this.transactionsVisible()
    // expect(transactionsVisible).toBeTruthy()
    await this.importAccount();
    await this.switchToKauriDev();
    await this.goToKauriDapp();
  }

  async goToKauriDapp() {
    await this.driver.url("http://localhost:3000/");
    await this.switchTab(0);
    await this.driver.waitUntil(
      async () => {
        const title = await this.driver.getTitle();
        return title === "Kauri";
      },
      60000,
      "Timeout waiting 60 seconds until Kauri dApp loaded"
    );
  }

  async switchBackToDappWindow() {
    await this.driver.pause(1000);
    const { value } = await this.driver.windowHandles();
    await this.driver.window(value[0]);
    await this.driver.waitUntil(async () => {
      const title = await this.driver.getTitle();
      return !title.toLowerCase().includes("metamask");
    }, 5000);
  }

  async switchToMetamaskNotification() {
    await this.driver.pause(1000);
    const { value } = await this.driver.windowHandles();
    await this.driver.window(value[value.length - 1]);
    await this.driver.waitUntil(async () => {
      const title = await this.driver.getTitle();
      return title && title.includes("MetaMask");
    }, 5000);
  }

  async signMessage() {
    await this.pause(1000);
    await this.switchToMetamaskNotification();
    await this.driver.click("button:nth-of-type(2)");
    await this.switchBackToDappWindow();
  }

  async rejectTransaction() {
    await this.switchToMetamaskNotification();
    await this.driver.click(".cancel");
    await this.switchBackToDappWindow();
  }
}
