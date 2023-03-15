const excelToJson = require("convert-excel-to-json");
const HEADER = {
  rows: 1,
};
class ExcelToJson {
  constructor(source, columnToKey) {
    this.source = source;
    this.header = HEADER;
    this.columnToKey = columnToKey;
  }
  getOne() {
    const result = excelToJson({
      source: this.source,
      columnToKey: this.columnToKey,
      header: this.header,
    });
    const [oneKey] = Object.keys(result);
    return result[oneKey];
  }

  forceConvert({ sheet }) {
    const result = excelToJson({
      sourceFile: this.source,
      columnToKey: this.columnToKey,
      header: this.header,
      sheet: sheet
    });
    return result;
  }
}

module.exports = ExcelToJson;
