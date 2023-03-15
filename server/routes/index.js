const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");
const taskRouter = require("./task");
const productRouter = require("./product");
const supplyRouter = require("./supply");
const transactionRouter = require("./transaction");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/supply", supplyRouter);
router.use("/task", taskRouter);
router.use("/transaction", transactionRouter);
router.get("/", async function (req, res, next) {
  res.status(200).send("welcome");
});

module.exports = router;
