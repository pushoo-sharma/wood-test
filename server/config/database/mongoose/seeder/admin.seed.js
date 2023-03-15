const { ROLES_VALUES } = require("../../../../constant/app");
const Auth = require("../models/Auth");

const seedDefaultAdmin = async () => {
  try {
    const payload = {
      name: "Admin",
      phoneNumber: "0000000000",
      password: "Admin@123",
      role: ROLES_VALUES.admin,
    };
    await Auth.findOneAndUpdate(
      {
        phoneNumber: payload.phoneNumber,
      },
      payload,
      {
        upsert: true,
      }
    );
  } catch (error) {
    __logger.error({
      message: error.toString(),
      error,
    });
  }
};

module.exports = seedDefaultAdmin;
