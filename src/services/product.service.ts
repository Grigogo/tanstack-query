import axios from "axios"
import { IProduct, IProductData } from "../types/product.interface"

class ProductService {
  private URL = 'http://localhost:4200/products'
  async getAll() {
    return axios.get<IProduct[]>(this.URL)
  }

  async getbyId(id: string) {
    return axios.get<IProduct>(`${this.URL}/${id}`)
  }

  async create(data: IProductData) {
    return axios.post(this.URL, data)
  }
}

export default new ProductService()
