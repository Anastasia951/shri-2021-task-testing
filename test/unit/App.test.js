import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CartApi, ExampleApi } from '../../src/client/api'
import { Application } from '../../src/client/Application'
import { initStore } from '../../src/client/store'

const basename = '/hw/store'

describe('Страницы приложения', () => {
  let api
  let cart
  let store
  let application
  beforeEach(() => {
    api = new ExampleApi(basename)
    cart = new CartApi()
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
    api = null
    cart = null
    store = null
    application = null
  })
  it('Приложение рендерится', () => {
    const { container } = render(application);
    expect(container.getElementsByClassName('Application')).toHaveProperty('length', 1)
  })

  it('В шапке есть ссылка на страницу доставки', () => {
    const { container } = render(application);
    const linkToHome = container.querySelector(`[href="${basename}/delivery"]`)
    expect(linkToHome).toBeTruthy()
  })

  it('В шапке есть ссылка на страницу каталога', () => {
    const { container } = render(application);
    const linkToHome = container.querySelector(`[href="${basename}/catalog"]`)
    expect(linkToHome).toBeTruthy()
  })

  it('Название шапки - ссылка на главную страницу', () => {
    const { container } = render(application);
    const logo = container.querySelector(`.Application-Brand`)
    expect(logo.getAttribute('href')).toBe(`${basename}/`)
  })

  it('В шапке есть ссылка на страницу контактов', () => {
    const { container } = render(application);
    const linkToContacts = container.querySelector(`[href="${basename}/contacts"]`)
    expect(linkToContacts).toBeTruthy()
  })

  it('В шапке есть ссылка на страницу корзины', () => {
    const { container } = render(application);
    const linkToCart = container.querySelector(`[href="${basename}/cart"]`)
    expect(linkToCart).toBeTruthy()
  })
})
