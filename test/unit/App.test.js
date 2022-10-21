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

  it('В шапке есть ссылки на страницы магазина', () => {
    const { container } = render(application);
    const linkToHome = container.querySelector(`[href="${basename}/catalog"]`)
    const linkToDelivery = container.querySelector(`[href="${basename}/delivery"]`)
    const logo = container.querySelector(`.Application-Brand`)
    const linkToContacts = container.querySelector(`[href="${basename}/contacts"]`)
    const linkToCart = container.querySelector(`[href="${basename}/cart"]`)
    expect(linkToDelivery).toBeTruthy()
    expect(linkToHome).toBeTruthy()
    expect(logo.getAttribute('href')).toBe(`${basename}/`)
    expect(linkToContacts).toBeTruthy()
    expect(linkToCart).toBeTruthy()
  })

})
