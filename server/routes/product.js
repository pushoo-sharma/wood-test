const express = require("express");
const Responser = require("../lib/Responser");
const Product = require("../config/database/mongoose/models/Product");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");
const { verifyCategory, verifyProduct } = require("../middlewares/Entity");
const { assignSuppliers } = require("../service/costAnalysis");

const router = express.Router();

router.post(
  "/category/:categoryId",
  AuthenticateRoles.Admin,
  verifyCategory,
  async (req, res, next) => {
    const { name, identifier, image, description } = req.body;
    try {
      const product = new Product({
        name,
        identifier,
        image,
        description,
        createdBy: req.context.user,
        category: req.context.category,
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
  "/category/:categoryId/:productId",
  AuthenticateRoles.Admin,
  verifyCategory,
  verifyProduct,
  async (req, res, next) => {
    const { name, identifier, image, description } = req.body;
    try {
      const { product } = req.context;
      product.name = name;
      product.image = image;
      product.description = description;
      product.identifier = identifier;
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

router.get(
  "/category/:categoryId",
  AuthenticateRoles.Any,
  verifyCategory,
  async (req, res, next) => {
    try {
      const { category } = req.context;
      const products = await Product.find({
        category,
      })
        .populate(["category"])
        .lean();
      return Responser.success(200, "Operation Successful", products, res);
    } catch (error) {
      __logger.error({
        message: error.toString(),
        error,
      });
      return Responser.failed(error, req, res, next);
    }
  }
);

router.get("/", AuthenticateRoles.SupplierOrAdmin, async (req, res, next) => {
  try {
    const products = await Product.find().populate(["category"]).lean();
    return Responser.success(200, "Operation Successful", products, res);
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

router.post(
  "/:productId/analyze",
  AuthenticateRoles.Any,
  verifyProduct,
  async (req, res, next) => {
    try {
      const { product, user } = req.context;
      const { quantity } = req.body;

      await product.populate({
        path: "supplies",
        populate: ["supplier"],
      });

      const suppliers = await assignSuppliers(
        { quantity, user },
        product.supplies
      );

      return Responser.success(200, "Operation Successful", suppliers, res);
    } catch (error) {
      __logger.error({
        message: error.toString(),
        error,
      });
      return Responser.failed(error, req, res, next);
    }
  }
);

module.exports = router;
