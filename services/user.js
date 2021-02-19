const connection = require('../helpers/db')

async function getUserBalances(userid) {
   try {

    return await connection.query('select currency, amount from balances where user_id = ?', [userid])

  }
  catch (err) {
    throw new Error(err.message)
  }
}

async function authenticate(username, password) {
  try {

    //TODO: password hashing
    const user = await connection.query('select id, username from users where username = ? and password = ?', [username, password])

    if(!user.length)
      throw new Error('User not found')

    return user[0]
  }
  catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  getUserBalances,
  authenticate
}