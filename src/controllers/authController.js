const db = require("../models/db");
const jwt = require("../config/jwt");
const utils = require("../utils/utils");

exports.login = (req, res) => {
  const { email, password } = req.body;
  let sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;
    if (!result.length) return res.status(401).send("Invalid credentials");

    const user = result[0]
    const { id, email, status } = user;
    if(status !== 'active') {
        return res.status(404).send(`Sorry, you are ${status}. You cannot login.`)
    }
    const token = jwt.generateAccessToken({ id, email, status });

    let sql = "UPDATE users SET ? WHERE id = ?";
    db.query(
      sql,
      [{ last_login_time: utils.getMysqlDate() }, id],
      (err, result) => {
        if (err) throw err;
        res.send({ message: "Login successful", token, user });
      }
    );
  });
};
