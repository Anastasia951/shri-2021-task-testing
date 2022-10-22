import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CartApi, ExampleApi } from '../../src/client/api'
import { initStore } from '../../src/client/store'
import { createHistory, initEnv, renderApplication } from './helpers'

const basename = '/hw/store'

describe('Страницы приложения', () => {
  let api
  let cart
  let store
  beforeEach(() => {
    api = new ExampleApi(basename)
    cart = new CartApi()
    store = initStore(api, cart)
  })

  afterEach(() => {
    api = null
    cart = null
    store = null
  })
  it('В магазине есть главная страница', () => {
    const history = createHistory('/')
    const application = renderApplication(store, history)

    const { container } = render(application);
    expect(container.getElementsByClassName('Home')).toHaveProperty('length', 1)
  })

  it('В магазине есть страница каталога', () => {
    const history = createHistory('/catalog')
    const application = renderApplication(store, history)


    const { container } = render(application);
    expect(container.getElementsByClassName('Catalog')).toHaveProperty('length', 1)
  })
  it('В магазине есть страница доставки', () => {
    const history = createHistory('/delivery')
    const application = renderApplication(store, history)

    const { container } = render(application);
    expect(container.getElementsByClassName('Delivery')).toHaveProperty('length', 1)
  })
  it('В магазине есть страница контактов', () => {
    const history = createHistory('/contacts')
    const application = renderApplication(store, history)

    const { container } = render(application);
    expect(container.getElementsByClassName('Contacts')).toHaveProperty('length', 1)
  })
})
