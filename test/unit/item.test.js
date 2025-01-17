import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { addToCart, initStore } from '../../src/client/store'
import { createMemoryHistory } from 'history'
import { MockCartApi, MockData } from './mock/mock'
import { renderApplication } from './helpers'

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
    history = createMemoryHistory({
      initialEntries: ['/catalog'],
      initialIndex: 0
    })
    application = renderApplication(store, history)
  })
  afterEach(() => {
    api = null
    cart = null
    store = null
    application = null
    history = null
  })


  it('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', async () => {
    const product = (await api.getProductById(111)).data
    store.dispatch(addToCart(product))
    const { container } = await waitFor(() => render(application))
    const productItem = container.querySelector(`.ProductItem[data-testid="${product.id}"]`)
    const message = productItem.querySelector('.CartBadge')
    expect(message).toBeTruthy()
  })

  it('Если товара нет в корзине, в каталоге не отображается сообщение', async () => {
    const product = (await api.getProductById(111)).data
    const { container } = await waitFor(() => render(application))
    const productItem = container.querySelector(`.ProductItem[data-testid="${product.id}"]`)
    const message = productItem.querySelector('.CartBadge')
    expect(message).toBeFalsy()
  })
})
