const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getUserByIdFirebase = async (client, idFirebase) => {
    const { rows } = await client.query(
        `
        SELECT * FROM "user" u
        WHERE id_firebase = $1
            AND is_deleted = FALSE
        `, 
        [idFirebase]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};


const getUserById = async (client, userId) => {
  const { rows } = await client.query(
    `
      SELECT * FROM "user"
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
      INSERT INTO "user"
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
  getUserByIdFirebase,
};
