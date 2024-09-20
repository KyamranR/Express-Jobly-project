const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {
  test("works with valid data", () => {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  test("works with valid data and no mapped fields", () => {
    const dataToUpdate = { age: 32, city: "New York" };
    const jsToSql = {};

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"age"=$1, "city"=$2',
      values: [32, "New York"],
    });
  });

  test("works with a mix of mapped and unmapped fields", () => {
    const dataToUpdate = { firstName: "Aliya", city: "San Francisco" };
    const jsToSql = { firstName: "first_name" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "city"=$2',
      values: ["Aliya", "San Francisco"],
    });
  });

  test("throws error if no data is provided", () => {
    expect(() => {
      sqlForPartialUpdate({}, {});
    }).toThrow(BadRequestError);
  });
});
