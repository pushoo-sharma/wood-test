import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

export const useCategoryProducts = (categoryId) => {
  const { service } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [categoriesProducts, setCategoriesProducts] = useState([]);

  const fetchCategoriesProducts = async () => {
    try {
      setLoading(true);
      const { data } = await service.getCategoriesProduct(categoryId);
      setCategoriesProducts([...data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => setRefetch((v) => v + 1);

  useEffect(() => {
    fetchCategoriesProducts();
  }, [refetch]);

  return { categoriesProducts, error, loading, refresh };
};
