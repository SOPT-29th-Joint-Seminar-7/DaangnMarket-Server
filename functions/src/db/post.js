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

module.exports = { getAllPosts, postPostUpload };
