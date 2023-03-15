const NoDataAvailable = () => {
  const err = new Error("No data available!");
  err.status = 404;
  throw err;
};
const NoUserFound = () => {
  const err = new Error("User not found!");
  err.status = 404;
  throw err;
};
const EntityNotFound = (entity) => {
  const err = new Error(`${entity} not found!`);
  err.status = 404;
  throw err;
};
const NotFound = (entity) => {
  const err = new Error(entity);
  err.status = 404;
  throw err;
};
const UserAlreadyExist = () => {
  const err = new Error("User already exist!");
  err.status = 404;
  throw err;
};
const ValidationFail = () => {
  const err = new Error("Validation Fails");
  err.status = 400;
  throw err;
};

const Unauthorized = (message) => {
  const err = new Error(message ?? "Unauthorized");
  err.status = 401;
  throw err;
};

module.exports = {
  NoDataAvailable,
  NoUserFound,
  ValidationFail,
  UserAlreadyExist,
  EntityNotFound,
  Unauthorized,
  NotFound,
};
