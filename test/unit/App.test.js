import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CartApi, ExampleApi } from '../../src/client/api'
import { Application } from '../../src/client/Application'
import { initStore } from '../../src/client/store'

describe('App', () => {
  it('Should render Application', () => {
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

  it('Header should contain link to Delivery', () => {
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
    const link = screen.queryByRole('link', {
      name: 'Delivery'
    })

    expect(link).toBeTruthy()
  })

  it('Header should contain link to Catalog', () => {
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
    const link = screen.queryByRole('link', {
      name: 'Catalog'
    })

    expect(link).toBeTruthy()
  })

  it('Header should contain link to Home', () => {
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
    const link = screen.queryByRole('link', {
      name: 'Example store'
    })

    expect(link).toBeTruthy()
  })

  it('Header should contain link to Contacts', () => {
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
    const link = screen.queryByRole('link', {
      name: 'Contacts'
    })

    expect(link).toBeTruthy()
  })

  it('Header should contain link to Cart', () => {
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
    const link = screen.queryByRole('link', {
      name: /^Cart/
    })

    expect(link).toBeTruthy()
  })
})
