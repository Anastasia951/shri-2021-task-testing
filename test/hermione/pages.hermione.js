const { assert } = require('chai');
hermione.config.testTimeout(100500)
const basename = '/hw/store'

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

  it("Страницы главная, доставка и контакты имеют статическое содержимое", async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`${basename}/`);

    await this.browser.assertView("home", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/delivery`);
    await this.browser.assertView("delivery", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/contacts`);
    await this.browser.assertView("contacts", ".Application", {
      compositeImage: true,
    });
  })
});