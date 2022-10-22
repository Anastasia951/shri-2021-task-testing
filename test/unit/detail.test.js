import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { initStore } from '../../src/client/store'
import { createMemoryHistory } from 'history'
import { MockCartApi, MockData } from './mock/mock'
import { ProductDetails } from '../../src/client/components/ProductDetails'


const basename = '/hw/store'
describe('Корзина', () => {
  let api
  let cart
  let store
  let application
  let history
  let product
  beforeEach(async () => {
    api = new MockData(basename)
    product = (await api.getProductById(111)).data
    cart = new MockCartApi()
    store = initStore(api, cart)
    history = createMemoryHistory({
      initialEntries: ['/catalog/111'],
      initialIndex: 0
    })
    application = (
      <Router history={history}>
        <Provider store={store}>
          <ProductDetails product={product} />
        </Provider>
      </Router>
    )
  })
  afterEach(() => {
    api = null
    cart = null
    store = null
    application = null
    history = null
  })
  it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
    const { container } = render(application)
    const name = container.querySelector('.ProductDetails-Name').textContent
    const description = container.querySelector('.ProductDetails-Description').textContent
    const price = container.querySelector('.ProductDetails-Price').textContent
    const color = container.querySelector('.ProductDetails-Color').textContent
    const material = container.querySelector('.ProductDetails-Material').textContent
    const addToCartButton = container.querySelector('.ProductDetails-AddToCart')

    expect(name).toBe(product.name)
    expect(description).toBe(product.description)
    expect(price).toContain(`${product.price}`)
    expect(color).toBe(product.color)
    expect(material).toBe(product.material)
    expect(addToCartButton).toBeTruthy()
  })

  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
    const { container } = render(application)

    const button = container.querySelector('.ProductDetails-AddToCart')
    let testProduct = store.getState().cart[product.id]
    expect(testProduct).toBeFalsy();

    button.click();
    const textContainer = container.querySelector('.CartBadge')
    testProduct = store.getState().cart[product.id]
    expect(testProduct.count).toBe(1);
    expect(textContainer.textContent).toBe("Item in cart");

    button.click();
    testProduct = store.getState().cart[product.id]
    expect(testProduct.count).toBe(2);
    expect(textContainer.textContent).toContain("Item in cart");
  })
})
