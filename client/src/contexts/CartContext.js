import { useState } from "react";
import { createContext, useContext } from "react";
import Backend from "service/backend";
import { useAuth } from "./AuthContext";

const CartContext = createContext({});
export const backend = new Backend(undefined);

export const CartProvider = (props) => {
  const { service } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buyLoading, setBuyLoading] = useState(false);
  const [fetchPriceCompleted, setFetchPriceCompleted] = useState(false);

  const addItem = (product, quantity) => {
    if (items.find((item) => item.product._id === product._id)) return;
    setItems((items) => [...items, { product, quantity }]);
    setFetchPriceCompleted(false);
  };

  const analyze = async () => {
    try {
      const costedItems = [];
      setFetchPriceCompleted(false);
      setLoading(true);
      setError('')
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const { data } = await service.analyzeCost(
          item.product._id,
          item.quantity
        );
        const { suppliers, totalCost, remainingQuantity } = data.data;
        costedItems.push({ ...item, suppliers, totalCost, remainingQuantity });
      }
      setItems([...costedItems]);
    } catch (error) {
      console.log({ error });
      setError("Out of location by drive");
    } finally {
      setLoading(false);
      setFetchPriceCompleted(true);
    }
  };

  const buy = async () => {
    setBuyLoading(true);

    const mapping = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const binding = {
        productId: item.product._id,
        quantity: item.quantity - item.remainingQuantity,
        suppliers: item.suppliers.map((s) => ({
          id: s._id,
          quantity: s.quantity,
        })),
        totalCost: item.totalCost,
      };
      mapping.push(binding);
    }

    await service.buy(mapping);

    setFetchPriceCompleted(false);
    setItems([]);
    setBuyLoading(false);
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        analyze,
        buy,
        items,
        loading,
        buyLoading,
        fetchPriceCompleted,
        error,
      }}
      {...props}
    ></CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
export const CartConsumer = CartContext.Consumer;
