require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV ?? "development";
const PORT = process.env.PORT ?? 4000;
const DATABASE_URL = process.env.DATABASE_URL;
const SECRET = {
  admin: process.env.ADMIN_JWT_SECRET,
  supplier: process.env.SUPPLIER_JWT_SECRET,
  customer: process.env.CUSTOMER_JWT_SECRET,
}
const ROLES_VALUES = {
  admin: 0,
  supplier: 1,
  customer: 2
};

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY

const getSecret = (idx) => {
  let key;
  for (let i = 0; i < Object.keys(ROLES_VALUES).length; i++) {
    const role = Object.keys(ROLES_VALUES)[i];
    if (ROLES_VALUES[role] === idx) {
      key = role;
      break;
    }
  }
  return key ?? 'admin';
};
const ROLES = {
  admin: "admin",
  supplier: "supplier",
  customer: "customer",
};
module.exports = {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  ROLES,
  ROLES_VALUES,
  SECRET,
  GOOGLE_MAP_API_KEY,
  getSecret
};
