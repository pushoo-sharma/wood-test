import axios from "axios";
const BASE_API_URL = "http://localhost:4000/api";
class Backend {
  constructor(token) {
    const baseURL = BASE_API_URL;
    this.axios = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  setToken(token) {
    this.axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  login(username, password) {
    return this.axios.post("/auth/login", {
      phoneNumber: username,
      password,
    });
  }
  register(data) {
    return this.axios.post("/auth/register", {
      ...data,
    });
  }
  /**
   * @param {Array<{ productId, suppliers, quantity, totalCost }>} productMappings
   * @returns axios response
   */
  buy(productMappings) {
    return this.axios.post(`/transaction/purchase`, {
      purchasable: [...productMappings],
    });
  }
  me() {
    return this.axios.get("/auth/me");
  }
  getCategories() {
    return this.axios.get("/category");
  }
  getProducts() {
    return this.axios.get("/product");
  }
  getMyProducts() {
    return this.axios.get("/supply/me");
  }
  getSupplierOrder(supplierId) {
    return this.axios.get(`/transaction/purchase/${supplierId}`);
  }
  getOrder() {
    return this.axios.get(`/transaction/purchase`);
  }
  getOrderHistory() {
    return this.axios.get(`/transaction/purchase/history`);
  }
  getOrderAddressCsv() {
    return this.axios.get(`/transaction/purchase/address/csv`, {
      responseType: "blob",
    });
  }
  getUsers(role) {
    return this.axios.get(`/user?role=${role}`);
  }
  getCategoriesProduct(categoryId) {
    return this.axios.get(`/product/category/${categoryId}`);
  }
  saveCategory(name, image) {
    return this.axios.post(`/category`, {
      name,
      image,
    });
  }
  saveProduct(data) {
    const { category, ...rest } = data;
    return this.axios.post(`/product/category/${category}`, {
      ...rest,
    });
  }
  saveProductSupply(data) {
    const { product, ...rest } = data;
    return this.axios.post(`/supply/product/${product}`, {
      ...rest,
    });
  }
  editProduct(data) {
    const { category, id, ...rest } = data;
    return this.axios.put(`/product/category/${category}/${id}`, {
      ...rest,
    });
  }
  editProductSupply(data) {
    const { product, id, ...rest } = data;
    return this.axios.put(`/supply/product/${product}/supply/${id}`, {
      ...rest,
    });
  }
  editCategory(categoryId, name, image) {
    return this.axios.put(`/category/${categoryId}`, {
      name,
      image,
    });
  }
  analyzeCost(productId, quantity) {
    return this.axios.post(`/product/${productId}/analyze`, { quantity });
  }
}

export default Backend;
