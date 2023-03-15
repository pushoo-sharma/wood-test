const { ROLES, SECRET } = require("../constant/app.js");
const Authentication = require("./../lib/Authentication.js");
const { addContext } = require("./Context.js");
const { verifyUser } = require("./Entity.js");
const Roles = ROLES
class AuthRoles {
  Authenticate = async (req, res, next, role) => {
    try {
      if (!SECRET[role]) {
        throw new Error('Invalid role')
      }
      let decode = await Authentication.authenticate(
        req.headers.authorization,
        SECRET[role]
      );
      addContext(req).context.user = decode
      return verifyUser(req, res, next)
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        res.status(498).send({
          message: "Your token is expired!",
        });
      } else {
        res.status(401).send({
          message: "Unauthorized!",
        });
      }
    }
  };
  NOfRoles = async (req, res, next, roles) => {
    let isValid = false;
    let err;
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      try {
        let decode = await Authentication.authenticate(
          req.headers.authorization,
          SECRET[role]
        );
        addContext(req).context.user = decode
        isValid = true;
        break;
      } catch (error) {
        err = error;
        continue;
      }
    }
    if (isValid) {
      return verifyUser(req, res, next)
    } else {
      if (err.name == "TokenExpiredError") {
        res.status(498).send({
          message: "Your token is expired!",
        });
      } else {
        res.status(401).send({
          message: "Unauthorized!",
        });
      }
    }
  }
  Any = async (req, res, next) => {
    const roles = Object.values(Roles);
    return this.NOfRoles(req, res, next, roles)
  };
  SupplierOrCustomer = async (req, res, next) => {
    const roles = [Roles.supplier, Roles.customer];
    return this.NOfRoles(req, res, next, roles)
  };
  SupplierOrAdmin = async (req, res, next) => {
    const roles = [Roles.supplier, Roles.admin];
    return this.NOfRoles(req, res, next, roles)
  };
  Admin = (req, res, next) => {
    this.Authenticate(req, res, next, Roles.admin);
  };
  Supplier = (req, res, next) => {
    this.Authenticate(req, res, next, Roles.supplier);
  };
  Customer = (req, res, next) => {
    this.Authenticate(req, res, next, Roles.customer);
  };

  Optional = async (req, res, next) => {
    const roles = Object.values(Roles);
    let isValid = false;
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      try {
        let decode = await Authentication.authenticate(
          req.headers.authorization,
          SECRET[role]
        );
        addContext(req).context.user = decode
        isValid = true;
        break;
      } catch (error) {
        continue;
      }
    }
    if (isValid) {
      return verifyUser(req, res, next)
    } else {
      next()
    }
  }
}
module.exports = new AuthRoles();
