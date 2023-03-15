import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

export const useMyOrders = () => {
  const { service, user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await service.getSupplierOrder(user._id);
      setOrders([...data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user._id) fetchOrders();
  }, [user._id]);

  return { orders, error, loading };
};
