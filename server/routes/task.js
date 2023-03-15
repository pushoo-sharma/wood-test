const express = require("express");
const multer  = require('multer');
const Auth = require("../config/database/mongoose/models/Auth");
const Product = require("../config/database/mongoose/models/Product");
const { ROLES_VALUES } = require("../constant/app");
const Responser = require("../lib/Responser");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");
const ExcelToJson = require("../service/excelToJson");

const router = express.Router();
const upload = multer({ dest: './task/uploads/' })

router.post("/upload/supplier/product", AuthenticateRoles.Admin, upload.single('report'), async (req, res, next) => {
  try {
    if(!req.body.sheet || !req.body.categoryId || !req.file) {
        throw new Error('Missing Fields')
    }
    const columnToKey = {
      A: "supplierIdentifier",
      B: "storeName",
      C: "address",
      D: "productIdentifier",
      E: "productName",
      F: "stock",
      G: "price",
    };

    const excelConverter = new ExcelToJson(req.file.path, columnToKey)
    const data = excelConverter.forceConvert({
        sheet: req.body.sheet
    })[req.body.sheet]

    const suppliers = {}
    const products = {}

    data.forEach((item, index) => {
        if(!suppliers[item.supplierIdentifier]) {
            suppliers[item.supplierIdentifier] = {
                phoneNumber: (index+10).toString().padStart(10, '0'),
                password: item.storeName,
                name: item.storeName,
                companyName: item.storeName,
                address: item.address,
                role: ROLES_VALUES.supplier,
                identifier: item.supplierIdentifier
            }
        }
    })
    const response = await Auth.insertMany(Object.values(suppliers))

    response.forEach(supplier => {
        suppliers[supplier.identifier] = supplier
    })

    data.forEach((item) => {
        if(!products[item.productIdentifier]) {
            products[item.productIdentifier] = {
                stock: item.stock,
                price: item.price,
                name: item.productName,
                identifier: item.productIdentifier,
                supplier: suppliers[item.supplierIdentifier],
                category: req.body.categoryId,
            }
        }
    })
    const result = await Product.insertMany(Object.values(products))

    return Responser.success(200, "Operation Successful", result, res);
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

module.exports = router;
