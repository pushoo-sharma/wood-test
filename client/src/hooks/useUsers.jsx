import { useAuth } from 'contexts/AuthContext'
import { useEffect, useState } from 'react'

export const useUsers = () => {
  const { service } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState([])
  const [customers, setCustomers] = useState([])

  const fetchSuppliers = async () => {
    try {
      setLoading(true)
      const { data } = await service.getUsers(1)
      setSuppliers([...data.data])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const { data } = await service.getUsers(2)
      setCustomers([...data.data])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSuppliers()
    fetchCustomers()
  }, [])

  return { customers, suppliers, error, loading }
}
