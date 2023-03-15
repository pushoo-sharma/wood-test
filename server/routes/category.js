const express = require("express");
const Responser = require("../lib/Responser");
const Category = require("../config/database/mongoose/models/Category");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");
const { verifyCategory } = require("../middlewares/Entity");

const router = express.Router();

router.post("/", AuthenticateRoles.Admin, async (req, res, next) => {
  const { name, image } = req.body;
  try {
    const category = new Category({
      image,
      name,
      user: req.context.user,
    });
    await category.save();
    return Responser.success(
      200,
      "Operation Successful",
      { ...category.toJSON() },
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

router.put(
  "/:categoryId",
  AuthenticateRoles.Admin,
  verifyCategory,
  async (req, res, next) => {
    const { name, image } = req.body;
    try {
      const { category } = req.context;
      category.name = name;
      category.image = image;
      await category.save();
      return Responser.success(
        200,
        "Operation Successful",
        { ...category.toJSON() },
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
router.get("/", AuthenticateRoles.Any, async (req, res, next) => {
  try {
    const categories = await Category.find();
    return Responser.success(200, "Operation Successful", categories, res);
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

module.exports = router;
