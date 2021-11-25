const _ = require("lodash");
const convertSnakeToCamel = require("../lib/convertSnakeToCamel");

const getAllPosts = async (client) => {
  const { rows } = await client.query(
    `
      SELECT * FROM post p
      WHERE is_deleted = FALSE
      ORDER BY id
      `
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const postPostUpload = async (client, postInfo, userID) => {
  const { rows } = await client.query(
    `
    INSERT INTO "post"
    (img, title, category, price, state, trade, content, user_id, address)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `,

    [
      postInfo.img,
      postInfo.title,
      postInfo.category,
      postInfo.price,
      postInfo.state,
      postInfo.trade,
      postInfo.content,
      userID,
      postInfo.address,
    ]
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
      ORDER BY id
    `
  );

  // 공백 입력 시
  if (keyword === "") return [];

  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getAllPosts, searchedPosts, postPostUpload };
