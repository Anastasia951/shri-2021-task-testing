const { assert } = require('chai');
hermione.config.testTimeout(100500)
describe('Страницы', async function () {
  it('В магазине должны быть страницы: главная, каталог, условия доставки, контакты', async function () {
    await this.browser.url('/hw/store/catalog');

    const navigation = await this.browser.$('.Application-Menu')
    const links = await navigation.$$('.nav-link')

    const hrefs = await Promise.all(links.map(link => link.getAttribute('href')))

    await this.browser.url(hrefs[0])
    const catalog = await this.browser.$('.Catalog')
    assert.equal(await catalog.isDisplayed(), true)

    await this.browser.url(hrefs[1])
    const delivery = await this.browser.$('.Delivery')
    assert.equal(await delivery.isDisplayed(), true)

    await this.browser.url(hrefs[2])
    const contacts = await this.browser.$('.Contacts')
    assert.equal(await contacts.isDisplayed(), true)

    await this.browser.url(hrefs[3])
    const cart = await this.browser.$('.Cart')
    assert.equal(await cart.isDisplayed(), true)
  });
});