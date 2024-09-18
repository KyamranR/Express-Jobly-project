/**
 * Generates a SQL `SET` clause and an array of values for partial updates to a database row.
 *
 * This function accepts two arguments:
 *   1. `dataToUpdate`: An object containing key-value pairs representing the columns to be updated and their new values.
 *   2. `jsToSql`: An object that maps JavaScript-style field names (camelCase) to SQL-style field names (snake_case). This is useful if the database columns have different naming conventions from the JS variables.
 *
 * Example:
 *   If `dataToUpdate` is:
 *     { firstName: 'Aliya', age: 32 }
 *   and `jsToSql` is:
 *     { firstName: "first_name" }
 *
 *   The function will return:
 *     {
 *       setCols: '"first_name"=$1, "age"=$2',
 *       values: ['Aliya', 32]
 *     }
 *
 * This is useful for building dynamic SQL queries for updating specific columns of a row in a database.
 *
 * dataToUpdate - The data to be updated in key-value format.
 * jsToSql - A mapping from JS-style field names to SQL-style column names.
 * An object containing the SQL `SET` clause as `setCols` and an array of values as `values`.
 * BadRequestError - If no data is provided for the update.
 */

const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
