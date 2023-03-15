import { useAuth } from 'contexts/AuthContext'
import { useEffect, useState } from 'react'

export const useSupplierProducts = () => {
  const { service } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [supplies, setSupplies] = useState([])

  const fetchProductSupplies = async () => {
    try {
      setLoading(true)
      const { data } = await service.getMyProducts()
      setSupplies([...data.data])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductSupplies()
  }, [refetch])

  const refresh = () => setRefetch(p => p + 1)

  return { supplies, error, loading, refresh }
}
