const convertErrorToGoodFormat = (err) => {
  if (!err.request || !err.response) return;
  delete err.request;
  err.response = {
    data: err.response.data,
    status: err.response.status,
    statusText: err.response.statusText,
    headers: err.response.headers,
  };
};

module.exports = {
  convertErrorToGoodFormat,
};
