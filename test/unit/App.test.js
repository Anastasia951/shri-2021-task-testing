import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CartApi, ExampleApi } from '../../src/client/api'
import { Application } from '../../src/client/Application'
import { initStore } from '../../src/client/store'


describe('Страницы приложения', () => {
  it('Приложение рендерится', () => {
    const basename = '/hw/store'

    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )
    const { container } = render(application);
    expect(container.getElementsByClassName('Application')).toHaveProperty('length', 1)
  })

  it('В шапке есть ссылка на страницу доставки', () => {
    const basename = '/hw/store'

    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )
    const { container } = render(application);
    const linkToHome = container.querySelector(`[href="${basename}/delivery"]`)
    expect(linkToHome).toBeTruthy()
  })

  it('В шапке есть ссылка на страницу каталога', () => {
    const basename = '/hw/store'

    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )
    const { container } = render(application);
    const linkToHome = container.querySelector(`[href="${basename}/catalog"]`)
    expect(linkToHome).toBeTruthy()
  })

  it('Название шапки - ссылка на главную страницу', () => {
    const basename = '/hw/store'

    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )
    render(application);
    const { container } = render(application);
    const logo = container.querySelector(`.Application-Brand`)
    expect(logo.getAttribute('href')).toBe(`${basename}/`)
  })

  it('В шапке есть ссылка на страницу контактов', () => {
    const basename = '/hw/store'

    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )
    const { container } = render(application);
    const linkToContacts = container.querySelector(`[href="${basename}/contacts"]`)
    expect(linkToContacts).toBeTruthy()
  })

  it('В шапке есть ссылка на страницу корзины', () => {
    const basename = '/hw/store'

    const api = new ExampleApi(basename)
    const cart = new CartApi()
    const store = initStore(api, cart)

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    )
    render(application);
    const { container } = render(application);
    const linkToCart = container.querySelector(`[href="${basename}/cart"]`)
    expect(linkToCart).toBeTruthy()
  })
})
