const { assert } = require('chai');
hermione.config.testTimeout(100500)
describe('Гамбургер', async function () {
  it('Гамбургер появляется при разрешении < 576px', async function () {
    await this.browser.setWindowSize(450, 860)
    await this.browser.url('/hw/store');

    const hamburger = await this.browser.$('.Application-Toggler')
    assert.equal(await hamburger.isDisplayed(), true)
  });

  it('Гамбургер скрывается при разрешении >= 576px', async function () {
    await this.browser.setWindowSize(1024, 860)
    await this.browser.url('/hw/store');

    const hamburger = await this.browser.$('.Application-Toggler')
    assert.equal(await hamburger.isDisplayed(), false)
  });

  it('При выборе элемента, меню закрывается', async function () {
    await this.browser.setWindowSize(450, 860)
    await this.browser.url('/hw/store');

    const hamburger = await this.browser.$('.Application-Toggler')
    const menu = await this.browser.$('.Application-Menu')

    assert.equal(await hamburger.isDisplayed(), true)

    await hamburger.click()
    assert.equal(await menu.isDisplayed(), true)

    await menu.click()
    assert.equal(await menu.isDisplayed(), false)
  });
});