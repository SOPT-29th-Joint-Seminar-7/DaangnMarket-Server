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

const searchedPosts = async (client, keyword) => {
  const { rows } = await client.query(
    `
    SELECT * FROM post p
    WHERE title LIKE '%${keyword}%'
      OR content LIKE '%${keyword}%'
      AND is_deleted = FALSE
    `
  );

  // 공백 입력 시
  if (keyword === "") return [];

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getAllPosts, searchedPosts, };
