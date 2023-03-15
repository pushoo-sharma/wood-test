const express = require("express");
const Responser = require("../lib/Responser");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");
const { verifyProduct, verifySupplier } = require("../middlewares/Entity");
const Order = require("../config/database/mongoose/models/Order");
const OrderHistory = require("../config/database/mongoose/models/OrderHistory");
const Product = require("../config/database/mongoose/models/Product");
const ProductSupply = require("../config/database/mongoose/models/ProductSupply");
const JSONToCsv = require("../service/jsonToCsv");

const router = express.Router();

router.post("/purchase", AuthenticateRoles.Customer, async (req, res, next) => {
  try {
    const { purchasable } = req.body;
    const { user } = req.context;

    for (let i = 0; i < purchasable.length; i++) {
      const purchase = purchasable[i];
      const {
        quantity: totalQuantity,
        productId,
        totalCost,
        suppliers,
      } = purchase;

      const history = new OrderHistory({
        totalCost,
        product: productId,
        totalQuantity,
        customer: user,
      });
      await history.save();

      for (let i = 0; i < suppliers.length; i++) {
        const supplier = suppliers[i];
        const { quantity, id } = supplier;
        const supplierInstance = await ProductSupply.findOne({ _id: id });
        supplierInstance.stock -= quantity;

        const order = new Order({
          quantity,
          history,
          customer: user,
          supply: id,
        });

        await order.save();
        await supplierInstance.save();
      }
    }

    return Responser.success(
      200,
      "Operation Successful",
      { status: true },
      res
    );
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

/**
 * @deprecated
 */
router.post(
  "/purchase/:productId",
  AuthenticateRoles.Customer,
  verifyProduct,
  async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const { user, product } = req.context;

      if (product.stock < quantity) throw new Error("Quantity is not valid");

      const order = new Order({
        quantity,
        product,
        customer: user,
      });

      await order.save();
      product.stock -= quantity;

      await product.save();

      return Responser.success(200, "Operation Successful", order, res);
    } catch (error) {
      __logger.error({
        message: error.toString(),
        error,
      });
      return Responser.failed(error, req, res, next);
    }
  }
);

router.get("/purchase", AuthenticateRoles.Admin, async (req, res, next) => {
  try {
    const orders = await Order.find().populate([
      {
        path: "supply",
        populate: ["product", "supplier"],
      },
      {
        path: "customer",
        select: {
          password: 0,
        },
      },
    ]);
    return Responser.success(200, "Operation Successful", orders, res);
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

router.get(
  "/purchase/history",
  AuthenticateRoles.Admin,
  async (req, res, next) => {
    try {
      const orders = await OrderHistory.find().populate([
        {
          path: "product",
        },
        {
          path: "customer",
          select: {
            password: 0,
          },
        },
      ]);
      return Responser.success(200, "Operation Successful", orders, res);
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
  "/purchase/address/csv",
  AuthenticateRoles.Admin,
  async (req, res, next) => {
    try {
      const orders = await Order.find({}).populate([
        {
          path: "supply",
          populate: ["supplier"],
        },
        {
          path: "customer",
          select: {
            password: 0,
          },
        },
      ]);
      const dataToConvertInCsv = orders.map(order => {
        return {
          'Customer Address': order.customer.address,
          'Supplier Address': order.supply.supplier.address
        }
      })
      const csv = await new JSONToCsv().convertToCsv(dataToConvertInCsv)
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
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
  "/purchase/:supplierId",
  AuthenticateRoles.SupplierOrAdmin,
  verifySupplier,
  async (req, res, next) => {
    try {
      const { supplier } = req.context;
      const supplies = await ProductSupply.find(
        {
          supplier,
        },
        {
          _id: 1,
        }
      );
      const orders = await Order.find({
        supply: {
          $in: supplies,
        },
      }).populate([
        {
          path: "supply",
          populate: ["product"],
        },
        {
          path: "customer",
          select: {
            password: 0,
          },
        },
      ]);
      return Responser.success(200, "Operation Successful", orders, res);
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
