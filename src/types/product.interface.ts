export interface IProduct {
  id: string
  name: string
  price: string
  image: string
}

export interface IProductData extends Omit<IProduct, 'id'> {}
