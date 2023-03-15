const express = require("express");
const Authentication = require("../lib/Authentication");
const { SECRET, getSecret } = require("../constant/app");
const Auth = require("../config/database/mongoose/models/Auth");
const Responser = require("../lib/Responser");
const { Unauthorized } = require("../lib/ErrorHandler");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const {
    phoneNumber,
    name,
    password,
    companyName,
    gstNumber,
    address,
    role,
    identifier,
  } = req.body;
  try {
    const user = new Auth({
      phoneNumber,
      password,
      name,
      companyName,
      gstNumber,
      address,
      role,
      identifier,
    });
    await user.save();
    const secret = SECRET[getSecret(user.role)];
    const token = Authentication.generateToken(secret, { id: user._id });
    return Responser.success(
      200,
      "Register Successful",
      { ...user.toJSON(), token },
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

router.post("/login", async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await Auth.findOne({
      phoneNumber,
    });
    if (!user) {
      Unauthorized();
    }
    const comparePassword = user.comparePassword(password);
    if (!comparePassword) {
      Unauthorized();
    }
    const secret = SECRET[getSecret(user.role)];
    const token = Authentication.generateToken(secret, { id: user._id });
    return Responser.success(
      200,
      "Login Successful",
      { ...user.toJSON(), token },
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

router.get('/me', AuthenticateRoles.Any, (req, res, next) => {
  return Responser.success(
    200,
    "Login Successful",
    { ...req.context.user.toJSON() },
    res
  );
})

module.exports = router;
