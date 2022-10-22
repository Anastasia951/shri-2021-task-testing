import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CartApi, ExampleApi } from '../../src/client/api'
import { Application } from '../../src/client/Application'
import { initStore } from '../../src/client/store'
import { elementWithHref } from './helpers'

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

  it('В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
    const { container } = render(application);
    const linkToHome = elementWithHref(container, `${basename}/catalog`)
    const linkToDelivery = elementWithHref(container, `${basename}/delivery`)
    const logo = container.querySelector(`.Application-Brand`)
    const linkToContacts = elementWithHref(container, `${basename}/contacts`)
    const linkToCart = elementWithHref(container, `${basename}/cart`)

    expect(linkToDelivery).toBeTruthy()
    expect(linkToHome).toBeTruthy()
    expect(logo.getAttribute('href')).toBe(`${basename}/`)
    expect(linkToContacts).toBeTruthy()
    expect(linkToCart).toBeTruthy()
  })

  it('Название магазина в шапке должно быть ссылкой на главную страницу', () => {
    const { container } = render(application);
    const logo = container.querySelector(`.Application-Brand`)

    expect(logo.getAttribute('href')).toBe(`${basename}/`)
  })
})
