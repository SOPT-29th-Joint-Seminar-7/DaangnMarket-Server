const _ = require("lodash");
const convertSnakeToCamel = require("../lib/convertSnakeToCamel");

const getUserById = async (client, userId) => {
  const { rows } = await client.query(
    `
      SELECT * FROM "user" u
      WHERE id = $1
        AND is_deleted = FALSE
      `,

    [userId]
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addUser = async (client, email, idFirebase, address) => {
  const { rows } = await client.query(
    `
      INSERT INTO "user" u
      (email, id_firebase, address)
      VALUES
      ($1, $2, $3)
      RETURNING *
      `,

    [email, idFirebase, address]
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
  getUserById,
  addUser,
};
