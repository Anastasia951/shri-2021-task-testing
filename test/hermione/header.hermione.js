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

  it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async function () {
    await this.browser.setWindowSize(1024, 860)

    await this.browser.url('/hw/store/catalog');

    const catalog = await this.browser.$('.Catalog')
    await catalog.waitForExist({ timeout: 5000 });

    const links = await catalog.$$('a.card-link')
    const firstLink = await links[0].getAttribute('href')
    const secondLink = await links[1].getAttribute('href')

    await this.browser.url(firstLink)

    let product = await this.browser.$('.Product')
    await product.waitForExist({ timeout: 10000 });

    let addToCartButton = await this.browser.$('button.ProductDetails-AddToCart')

    await addToCartButton.click()
    await addToCartButton.click()

    await this.browser.url('/hw/store/catalog')
    await this.browser.url(secondLink)

    product = await this.browser.$('.Product')
    await product.waitForExist({ timeout: 10000 });

    addToCartButton = await this.browser.$('button.ProductDetails-AddToCart')

    await addToCartButton.click()

    const menu = await this.browser.$('.Application-Menu')
    const navItems = await menu.$$('.nav-link')

    assert.equal(await navItems[3].getText(), 'Cart (2)')
  });
});