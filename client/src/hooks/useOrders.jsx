import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const { service } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await service.getOrder();
      setOrders([...data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = async () => {
    try {
      setLoading(true);
      const response = await service.getOrderAddressCsv();
      const data = response.data;
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `orders-${new Date()}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, error, loading, downloadCsv };
};
