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
import { MockData } from './mock/mock'

const basename = '/hw/store'

describe('Корзина', () => {
  it('Добавление элемента в корзину', async () => {
    const api = new MockData(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const product = await api.getProductById('111')

    store.dispatch(addToCart(product))

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )

    render(application)
    const currentState = store.getState().cart

    expect(currentState['111']).toStrictEqual({
      name: product.name,
      price: product.price,
      count: 1
    })
  })
})
