import setupWebdriver from '../lib/setup-webdriver'
import { By, until } from 'selenium-webdriver'

function delay (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

describe('Create Request without bounty', () => {
  let driver
  beforeAll(async () => {
    jest.setTimeout(30000)
    driver = await setupWebdriver()
  })

  beforeEach(async () => {
    // await driver.get(url)
  })

  afterAll(async () => {
    await driver.quit()
  })

  test('it renders', async () => {
    // const title = await driver.findElement(By.tagName('h2')).getText()
    // expect(title).toContain('Kauri Features')
    await driver.get('chrome://extensions')
    driver.wait(until.titleIs('Extensions'), 5000)
    const extensionId = 'nkbihfbeogaeaoehlefnkodbefgpgknn'
    // await driver.executeScript(
    //       'return document.querySelector("extensions-manager").shadowRoot.querySelector("extensions-view-manager extensions-item-list").shadowRoot.querySelector("extensions-item:nth-child(2)").getAttribute("id")'
    //     )
    console.log(extensionId)
    await driver.get(`chrome-extension://${extensionId}/popup.html`)

    const title = await driver.getTitle()
    expect(title).toBe('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html')

    driver.wait(until.elementIsVisible(driver.findElement(By.className('terms-header'))))
    const privacy = await driver.findElement(By.className('terms-header')).getText()
    expect(privacy).toBe('PRIVACY NOTICE')
    const buttons = await driver.findElements(By.css('button'))
    await buttons[0].click()

    const element = driver.findElement(By.linkText('Attributions'))
    await driver.executeScript('arguments[0].scrollIntoView(true)', element)
    let button = driver.findElement(By.css('button'))
    // driver.wait(until.elementIsVisible(button))
    const buttonEnabled = await button.isEnabled()
    expect(buttonEnabled).toBeTruthy()
    await button.click()

    const passwordBox = driver.findElement(By.id('password-box'))
    const passwordBoxConfirm = driver.findElement(By.id('password-box-confirm'))

    await passwordBox.sendKeys('123456789')
    await passwordBoxConfirm.sendKeys('123456789')
    const confirmPasswordButton = await driver.findElement(By.css('button')).click()
    // driver.wait(until.elementIsVisible(confirmPasswordButton), 5000)

    // await confirmPasswordButton.click()

    await delay(2000)
    // Saves seed phrase
    const seedPhase = await driver.findElement(By.className('twelve-word-phrase')).getText()

    const continueAfterSeedPhrase = driver.findElement(By.css('button'))
    driver.wait(until.elementIsVisible(continueAfterSeedPhrase), 5000)
    await continueAfterSeedPhrase.click()
    await driver.close()
    const tabs = await driver.getAllWindowHandles()
    // tab[0] will always be the current window, no matter what order the tabs are in Chrome.
    await driver.switchTo().window(tabs[0])

    // If Metamask tab is open tab will be needed to switch.
    // await driver.switchTo().window(tabs[1])
    await driver.get('https://tmashuang.github.io/demo-dapp')
    const sendTransactionButton = await driver.findElement(By.id('sendTransaction'))
    await sendTransactionButton.click()
    // await delay(700)
    function windowCount (count) {
      return function () {
        return driver.getAllWindowHandles().then(function (handles) {
          return handles.length >= count
        })
      }
    }
    await driver.wait(windowCount(2), 10000)
    const window = await driver.getAllWindowHandles()
    console.log(window)

    await driver.switchTo().window(window[1])
    const currentTabTitle = await driver.getTitle()
    console.log(currentTabTitle)
    expect(currentTabTitle).toEqual('MetaMask Notification')
    // const submitTransactionButton = await driver.findElement(By.className('confirm'))
    driver.wait(until.elementIsVisible(driver.findElement(By.className('cancel'))), 5000)
    const rejectTranasctionButton = await driver.findElement(By.className('cancel'))
    // submitTransactionButton.click()
    await rejectTranasctionButton.click()
    // const elems = await driver.findElements(By.xpath('//*[contains(@id, "nkbihfb")]'))
    // console.log(elems)
    // const extensionId = await elems[0].getAttribute('id')
    // Navigates to the extension popup.html to interact
    // await driver.get(`chrome-extension://${extensionId}/popup.html`)
  })
})
