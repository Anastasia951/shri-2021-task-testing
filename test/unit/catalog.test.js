import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import { initStore, productsLoad } from '../../src/client/store'
import { MockCartApi, MockData } from './mock/mock'
import { createHistory, elementWithHref, renderApplication } from './helpers'

const basename = '/hw/store'
describe('Корзина', () => {
  let api
  let cart
  let store
  let application
  let history
  beforeEach(() => {
    api = new MockData(basename)
    cart = new MockCartApi()
    store = initStore(api, cart)
    history = createHistory('/catalog')
    application = renderApplication(store, history)
  })
  afterEach(() => {
    api = null
    cart = null
    store = null
    application = null
    history = null
  })
  it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
    const { container } = render(application)
    const productMock = (await api.getProductById(111)).data
    const catalog = container.querySelector('.Catalog')
    await waitFor(() => expect(catalog).toBeInTheDocument());
    const product = container.querySelector(`.ProductItem[data-testid="111"]`)

    const name = product.querySelector('.ProductItem-Name')
    const price = product.querySelector('.ProductItem-Price')
    const link = elementWithHref(product, `/catalog/111`)

    expect(name.textContent).toBe(productMock.name)
    expect(price.textContent).toContain(`${productMock.price}`)
    expect(link).toBeTruthy()
  })

  it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    const { container, queryByText } = render(application)
    await waitForElementToBeRemoved(() => queryByText(/loading/i))
    const item = container.querySelector('.ProductItem')
    expect(item).toBeInTheDocument()
  })
})
