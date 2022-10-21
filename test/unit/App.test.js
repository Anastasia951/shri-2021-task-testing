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

})
