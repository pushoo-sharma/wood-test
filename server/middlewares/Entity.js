const { EntityNotFound } = require("../lib/ErrorHandler");
const Auth = require("../config/database/mongoose/models/Auth");
const { addContext } = require("./Context");
const Category = require("../config/database/mongoose/models/Category");
const Product = require("../config/database/mongoose/models/Product");
const { ROLES_VALUES } = require("../constant/app");
const ProductSupply = require("../config/database/mongoose/models/ProductSupply");

const verifyUser = async (req, res, next) => {
  try {
    if (!req.context?.user) EntityNotFound("user");
    const user = await Auth.findOne({
      _id: req.context.user.id.toObjectId(),
    }, {
      password: 0
    });
    if (!user) EntityNotFound("user");
    addContext(req).context.user = user;
    next();
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    next(error);
  }
};

const verifyCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      _id: req.params.categoryId,
    });
    if (!category) EntityNotFound("category");
    addContext(req).context.category = category;
    next();
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    next(error);
  }
};

const verifyProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.productId,
    });
    if (!product) EntityNotFound("product");
    addContext(req).context.product = product;
    next();
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    next(error);
  }
};

const verifySupply = async (req, res, next) => {
  try {
    const productSupply = await ProductSupply.findOne({
      _id: req.params.supplyId,
    });
    if (!productSupply) EntityNotFound("productSupply");
    addContext(req).context.productSupply = productSupply;
    next();
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    next(error);
  }
};

const verifySupplier = async (req, res, next) => {
  try {
    const supplier = await Auth.findOne({
      _id: req.params.supplierId,
    });
    if (!supplier) EntityNotFound("supplier");

    if(supplier.role !== ROLES_VALUES.supplier) EntityNotFound("supplier");

    addContext(req).context.supplier = supplier;
    next();
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    next(error);
  }
};
module.exports = {
  verifyUser,
  verifyCategory,
  verifyProduct,
  verifySupply,
  verifySupplier,
};
