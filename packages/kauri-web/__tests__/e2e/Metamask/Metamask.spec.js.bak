import setupWebdriverIO from '../lib/setup-webdriverIO'
import MetamaskPOM from '../PageObjectModels/Metamask'

describe('Metamask', () => {
  let driver

  beforeAll(() => {
    driver = setupWebdriverIO()
  })

  afterAll(() => {
    driver.end()
  })

  it('should be able to navigate to the transactions page, import an account via private key and switch to the Kauri dev network', async () => {
    const metamaskPOM = new MetamaskPOM(driver)
    await metamaskPOM.openMetamaskFullpage()
    const termsHeaderText = await metamaskPOM.getTermsHeaderText()
    expect(termsHeaderText).toBe('PRIVACY NOTICE')
    await metamaskPOM.acceptTerms()
    await metamaskPOM.enterPasswords()
    await metamaskPOM.confirmSeedwords()
    // const transactionsVisible = await metamaskPOM.transactionsVisible()
    // expect(transactionsVisible).toBeTruthy()
    const accountName = await metamaskPOM.importAccount()
    expect(accountName).toBe('Account 2')
    const currentNetworkName = await metamaskPOM.switchToKauriDev()
    expect(currentNetworkName).toBe('Private Network')
  })

  it('should be able to reject a transaction that a user of a dApp initiates', async () => {
    const metamaskPOM = new MetamaskPOM(driver)
    await driver.url('https://tmashuang.github.io/demo-dapp')
    await driver.pause()
    await driver.click('#sendTransaction')
    await metamaskPOM.rejectTransaction()
    const title = await driver.getTitle()
    expect(!title.toLowerCase().includes('metamask')).toBeTruthy()
  })
})
