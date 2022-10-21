import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { Application } from '../../src/client/Application'
import { addToCart, initStore } from '../../src/client/store'
import { createMemoryHistory } from 'history'
import { MockCartApi, MockData } from './mock/mock'
import events from '@testing-library/user-event';


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
      initialEntries: ['/cart'],
      initialIndex: 0
    })
    application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
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
  it('Товар добавляется в корзину', async () => {
    const product = (await api.getProductById(111)).data

    store.dispatch(addToCart(product))

    const currentState = store.getState().cart
    expect(currentState).toStrictEqual({
      [product.id]: {
        name: product.name,
        price: product.price,
        count: 1
      }
    })
  })

  it('Товар в корзине не дублируется', async () => {
    const product = (await api.getProductById(111)).data

    store.dispatch(addToCart(product))
    store.dispatch(addToCart(product))
    store.dispatch(addToCart(product))

    const currentState = store.getState().cart

    expect(currentState).toStrictEqual({
      [product.id]: {
        name: product.name,
        price: product.price,
        count: 3
      }
    })
  })

  it('Если корзина пустая, то отображается ссылка на каталог', () => {
    const { container } = render(application)
    const link = container.querySelector(`[href="/catalog"]`)
    expect(link).toBeTruthy()
  })

  it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
    const product1 = (await api.getProductById(111)).data
    const product2 = (await api.getProductById(222)).data

    store.dispatch(addToCart(product1))
    store.dispatch(addToCart(product2))
    store.dispatch(addToCart(product2))

    const { container, getByTestId } = render(application)

    const row1 = getByTestId(product1.id)
    const row2 = getByTestId(product2.id)

    expect(row1.querySelector('.Cart-Name').textContent).toBe(product1.name)
    expect(row1.querySelector('.Cart-Price').textContent).toContain(`${product1.price}`)
    expect(row1.querySelector('.Cart-Count').textContent).toBe("1")
    expect(row1.querySelector('.Cart-Total').textContent).toContain(`${product1.price}`)

    expect(row2.querySelector('.Cart-Name').textContent).toBe(product2.name)
    expect(row2.querySelector('.Cart-Price').textContent).toContain(`${product2.price}`)
    expect(row2.querySelector('.Cart-Count').textContent).toBe("2")
    expect(row2.querySelector('.Cart-Total').textContent).toContain(`${product2.price * 2}`)

    expect(container.querySelector('.Cart-OrderPrice').textContent).toContain(`${product1.price + product2.price * 2}`)
  })

  it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
    const product1 = (await api.getProductById(111)).data
    const product2 = (await api.getProductById(333)).data

    store.dispatch(addToCart(product1))
    store.dispatch(addToCart(product1))
    store.dispatch(addToCart(product2))

    const { container } = render(application)
    const cartLink = container.querySelector(`[href="/cart"]`)

    expect(cartLink.textContent.endsWith(`(2)`)).toBeTruthy()
  })

  it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
    const product1 = (await api.getProductById(111)).data

    store.dispatch(addToCart(product1))

    const { getByRole } = render(application)
    const clearButton = getByRole('button', {
      name: /clear shopping cart/i
    })

    await events.click(clearButton)

    const cart = store.getState().cart
    expect(cart).toStrictEqual({})
  })

  it('Если корзина не пуста, то отображается форма', async () => {
    const product1 = (await api.getProductById(111)).data

    store.dispatch(addToCart(product1))

    const { container } = render(application)
    const form = container.querySelector('.Form')

    expect(form).toBeTruthy()
  })
})
