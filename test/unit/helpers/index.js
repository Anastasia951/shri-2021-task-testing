import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { Application } from '../../../src/client/Application'
import { createMemoryHistory } from 'history'
import { CartApi, ExampleApi } from '../../../src/client/api'
import { initStore } from '../../../src/client/store'

export function renderApplication(store, history) {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Application />
      </Provider>
    </Router>
  )
}

export function elementWithHref(container, href) {
  return container.querySelector(`[href="${href}"]`)
}

export function createHistory(initialPath) {
  return createMemoryHistory({
    initialEntries: [initialPath],
    initialIndex: 0
  })
}