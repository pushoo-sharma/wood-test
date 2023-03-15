import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

export const useOrderHistory = () => {
  const { service } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordersHistory, setOrdersHistory] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await service.getOrderHistory();
      setOrdersHistory([...data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { ordersHistory, error, loading };
};
