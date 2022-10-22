import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { addToCart, initStore } from '../../src/client/store'
import { createMemoryHistory } from 'history'
import { MockCartApi, MockData } from './mock/mock'
import events from '@testing-library/user-event';
import { renderApplication } from './helpers'


const basename = '/hw/store'
describe('Форма отправки', () => {
  let api
  let cart
  let store
  let application
  let history
  beforeEach(() => {
    api = new MockData(basename)
    cart = new MockCartApi()
    store = initStore(api, cart)
    history = createMemoryHistory({
      initialEntries: ['/cart'],
      initialIndex: 0
    })
    application = renderApplication(store, history)
  })
  afterEach(() => {
    api = null
    cart = null
    store = null
    application = null
    history = null
  })
  it('Форма с пустыми полями не отправляется', async () => {
    const product = (await api.getProductById(111)).data
    store.dispatch(addToCart(product))

    const { container } = render(application)
    const checkoutBtn = container.querySelector('.Form-Submit')
    await events.click(checkoutBtn)
    const errorMsg = container.querySelector('.invalid-feedback')
    expect(errorMsg).toBeInTheDocument()
  })

  it('Форма с валидными данными отправляется', async () => {
    const product = (await api.getProductById(111)).data

    store.dispatch(addToCart(product))
    const { container, getByRole } = render(application)

    const params = {
      name: 'John',
      phone: '12345678912',
      address: 'Moscow'
    }
    const nameField = getByRole('textbox', {
      name: /name/i
    })
    const phoneField = getByRole('textbox', {
      name: /phone/i
    })
    const addressField = getByRole('textbox', {
      name: /address/i
    })

    await events.type(nameField, params.name)
    await events.type(phoneField, params.phone)
    await events.type(addressField, params.address)

    const checkoutBtn = container.querySelector('.Form-Submit')
    await events.click(checkoutBtn)

    const successMsg = document.querySelector('.Cart-SuccessMessage')

    await waitFor(() => expect(successMsg).toBeInTheDocument())
  })

})
