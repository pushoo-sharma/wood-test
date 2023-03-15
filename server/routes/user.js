const express = require("express");
const Responser = require("../lib/Responser");
const AuthenticateRoles = require("../middlewares/AuthenticateRoles");
const Auth = require("../config/database/mongoose/models/Auth");

const router = express.Router();

router.get("/", AuthenticateRoles.Admin, async (req, res, next) => {
  try {
    let { role } = req.query
    const users = await Auth.find({
        role: {
            $in: role.split(',')
        }
    }, {
        password: 0
    });
    return Responser.success(200, "Operation Successful", users, res);
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
    return Responser.failed(error, req, res, next);
  }
});

module.exports = router;
