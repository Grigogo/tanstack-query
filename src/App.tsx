import { useMutation, useQueryClient } from '@tanstack/react-query'
import './App.css'
import { useGetProducts } from './hooks/useGetProducts'
import { SyntheticEvent, useState } from 'react'
import { IProductData } from './types/product.interface'
import productService from './services/product.service'

const clearData = {
  name: '',
  price: '',
  image: '',
}

function App() {
  const { isLoading, data } = useGetProducts()

  const [products, setProducts] = useState<IProductData>(clearData)

  const { mutate } = useMutation({
    mutationKey: ['create product'],
    mutationFn: (data: IProductData) => productService.create(data),
    onSuccess() {
      setProducts(clearData),
      alert('Product created')
    }
  })

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault()

    mutate(products)
  }

  return (
    <div>
      <h1>Tanstack Query</h1>
      
      <form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={e => {
            setProducts(prev => ({
              ...prev,
              name: e.target.value,
            }))
          }}
          placeholder='Enter name'
        />
        <input
          type="text"
          onChange={e => {
            setProducts(prev => ({
              ...prev,
              price: e.target.value,
            }))
          }}
          placeholder='Enter price'
        />
        <input
          type="text"
          onChange={e => {
            setProducts(prev => ({
              ...prev,
              image: e.target.value,
            }))
          }}
          placeholder='Enter image url'
        />

        <button>create</button>
      </form>

      {isLoading ? (
        <div>Loading...</div>
        ) : (
        <div>{data?.length ? (
          data.map(product => (
            <div key={product.id}>
              <b>{product.name}</b>. {product.price}
            </div>
          ))
        ) : (
        <div>Product not found</div>
      )}
      </div>
      )}
    </div>
  )
}

export default App
