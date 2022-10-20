import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { CartApi, ExampleApi } from '../../src/client/api'
import { Application } from '../../src/client/Application'
import { initStore } from '../../src/client/store'
import { createMemoryHistory } from 'history'

const basename = '/hw/store'

describe('Страницы приложения', () => {
  it('В магазине есть главная страница', () => {

    const history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    })
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    )
    const { container } = render(application);
    expect(container.getElementsByClassName('Home')).toHaveProperty('length', 1)
  })

  it('В магазине есть страница каталога', () => {

    const history = createMemoryHistory({
      initialEntries: ['/catalog'],
      initialIndex: 0
    })
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    )
    const { container } = render(application);
    expect(container.getElementsByClassName('Catalog')).toHaveProperty('length', 1)
  })
  it('В магазине есть страница доставки', () => {

    const history = createMemoryHistory({
      initialEntries: ['/delivery'],
      initialIndex: 0
    })
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    )
    const { container } = render(application);
    expect(container.getElementsByClassName('Delivery')).toHaveProperty('length', 1)
  })
  it('В магазине есть страница контактов', () => {

    const history = createMemoryHistory({
      initialEntries: ['/contacts'],
      initialIndex: 0
    })
    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    )
    const { container } = render(application);
    expect(container.getElementsByClassName('Contacts')).toHaveProperty('length', 1)
  })
})
