const { assert } = require('chai');
hermione.config.testTimeout(100500)
describe('Корзина', async function () {
  it('При перезагрузке каталога сохраняется содержимое', async function () {
    await this.browser.url('/hw/store/catalog');

    const catalog = await this.browser.$('.Catalog')
    await catalog.waitForExist({ timeout: 3000 });

    const firstLink = (await catalog.$$('a.card-link'))[0]

    await this.browser.url(await firstLink.getAttribute('href'))

    const product = await this.browser.$('.Product')
    await product.waitForExist({ timeout: 3000 });

    const addToCartButton = await this.browser.$('button.ProductDetails-AddToCart')

    await addToCartButton.click()

    await this.browser.url('/hw/store/cart')

    let orderTable = await this.browser.$$('.Cart-Table tbody tr')
    assert.equal(orderTable.length, 1)

    await this.browser.url('/hw/store/cart')

    orderTable = await this.browser.$$('.Cart-Table tbody tr')
    assert.equal(orderTable.length, 1)
  });

  it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function () {
    await this.browser.url('/hw/store/catalog');

    const catalog = await this.browser.$('.Catalog')
    await catalog.waitForExist({ timeout: 5000 });

    const firstLink = (await catalog.$$('a.card-link'))[0]

    await this.browser.url(await firstLink.getAttribute('href'))

    const product = await this.browser.$('.Product')
    await product.waitForExist({ timeout: 5000 });

    const addToCartButton = await this.browser.$('button.ProductDetails-AddToCart')

    await addToCartButton.click()

    await this.browser.url('/hw/store/cart')

    const clearCartButton = await this.browser.$('.Cart-Clear')

    await clearCartButton.click()

    const cart = await this.browser.$('.Cart')
    const catalogLink = await cart.$('a')

    assert.equal(await catalogLink.getAttribute('href'), '/hw/store/catalog')
  });

  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function () {
    await this.browser.url('/hw/store/catalog');

    const catalog = await this.browser.$('.Catalog')
    await catalog.waitForExist({ timeout: 5000 });

    const firstLink = (await catalog.$$('a.card-link'))[0]

    await this.browser.url(await firstLink.getAttribute('href'))

    const product = await this.browser.$('.Product')
    await product.waitForExist({ timeout: 5000 });

    const addToCartButton = await this.browser.$('button.ProductDetails-AddToCart')

    await addToCartButton.click()
    await addToCartButton.click()
    await addToCartButton.click()

    await this.browser.url('/hw/store/cart')

    const cartCount = await this.browser.$('table .Cart-Count')

    assert.equal(await cartCount.getText(), 3)
  });

});