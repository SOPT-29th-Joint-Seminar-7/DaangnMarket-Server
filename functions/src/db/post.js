const _ = require("lodash");
const convertSnakeToCamel = require("../lib/convertSnakeToCamel");

const getAllPosts = async (client) => {
  const { rows } = await client.query(
    `
      SELECT * FROM post p
      WHERE is_deleted = FALSE
      `
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getAllPosts };
