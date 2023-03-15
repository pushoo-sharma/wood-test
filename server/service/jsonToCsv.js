const { json2csvAsync } = require("json-2-csv");

class JSONToCsv {
  constructor() {}

  convertToCsv(data) {
    return json2csvAsync(data);
  }
}

module.exports = JSONToCsv;
