export class MockData {
  products = [
    {
      id: '111',
      name: 'Good 1',
      price: '999',
      description: 'Some description',
      material: 'iron',
      color: 'violet',
    },
    {
      id: '222',
      name: 'Good 2',
      price: '888',
      description: 'Some description',
      material: 'iron',
      color: 'green',
    },
    {
      id: '333',
      name: 'Good 3',
      price: '777',
      description: 'Some description',
      material: 'iron',
      color: 'yellow',
    },
  ]

  async getProductById(id) {
    return this.products.find(product => product.id === id)
  }
  async createProduct(product) {
    this.products.push(product)
  }
}