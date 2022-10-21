import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { CartApi, ExampleApi } from '../../src/client/api'
import { Application } from '../../src/client/Application'
import { addToCart, initStore } from '../../src/client/store'
import { createMemoryHistory } from 'history'
import { BrowserRouter } from 'react-router-dom'
import { MockCartApi, MockData } from './mock/mock'

const basename = '/hw/store'

describe('Корзина', () => {
  let api
  let cart
  let store
  let application
  beforeEach(() => {
    api = new MockData(basename)
    cart = new MockCartApi()
    store = initStore(api, cart)
    application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )

  })
  afterEach(() => {
    api = null;
    cart = null;
    store = null;
    application = null;
  })
  it('Добавление элемента в корзину', async () => {
    const product = (await api.getProductById('111')).data

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
    const product = (await api.getProductById('111')).data

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
})
