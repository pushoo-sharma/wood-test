const express = require("express");
const Responser = require("../lib/Responser");
const ProductSupply = require("../config/database/mongoose/models/ProductSupply");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");
const { verifyProduct, verifySupply } = require("../middlewares/Entity");

const router = express.Router();

router.post(
  "/product/:productId",
  AuthenticateRoles.Supplier,
  verifyProduct,
  async (req, res, next) => {
    const { stock, price } = req.body;
    try {
      const product = new ProductSupply({
        stock,
        price,
        supplier: req.context.user,
        product: req.context.product,
      });
      await product.save();
      return Responser.success(
        200,
        "Operation Successful",
        { ...product.toJSON() },
        res
      );
    } catch (error) {
      __logger.error({
        message: error.toString(),
        error,
      });
      return Responser.failed(error, req, res, next);
    }
  }
);

router.put(
  "/product/:productId/supply/:supplyId",
  AuthenticateRoles.Supplier,
  verifyProduct,
  verifySupply,
  async (req, res, next) => {
    const { stock, price } = req.body;
    try {
      const { productSupply, product } = req.context;
      productSupply.stock = stock;
      productSupply.price = price;
      productSupply.product = product;
      await productSupply.save();
      return Responser.success(
        200,
        "Operation Successful",
        { ...productSupply.toJSON() },
        res
      );
    } catch (error) {
      __logger.error({
        message: error.toString(),
        error,
      });
      return Responser.failed(error, req, res, next);
    }
  }
);

router.get("/me", AuthenticateRoles.Supplier, async (req, res, next) => {
  try {
    const { user } = req.context
    const products = await ProductSupply.find({
      supplier: user
    })
      .populate([
        "product",
      ])
      .lean();
    return Responser.success(200, "Operation Successful", products, res);
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

module.exports = router;
