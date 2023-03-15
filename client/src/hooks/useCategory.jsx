import { useAuth } from 'contexts/AuthContext'
import { useEffect, useState } from 'react'

export const useCategories = () => {
  const { service } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const { data } = await service.getCategories()
      setCategories([...data.data])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [refetch])

  const refresh = () => {
    setRefetch(p => p + 1)
  }

  return { categories, error, loading, refresh }
}
