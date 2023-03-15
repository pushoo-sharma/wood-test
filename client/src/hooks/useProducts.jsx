import { useAuth } from 'contexts/AuthContext'
import { useEffect, useState } from 'react'

export const useProducts = () => {
  const { service } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await service.getProducts()
      setProducts([...data.data])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [refetch])
  
  const refresh = () => setRefetch(p => p + 1)

  return { products, error, loading, refresh }
}
