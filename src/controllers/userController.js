const db = require("../models/db");
const jwt = require("../config/jwt");
const utils = require("../utils/utils");

exports.getAllUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

exports.getUserById = (req, res) => {
  let sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  let newUser = {
    name,
    email: email.toString().toLowerCase(),
    password,
    status: "active", // active/blocked
    last_login_time: utils.getMysqlDate(),
    registration_time: utils.getMysqlDate(),
  };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, newUser, (err, result) => {
    if (err) return res.status(400).send(err.message);
    const token = jwt.generateAccessToken({
      id: result.insertId,
      email: newUser.email,
      status: newUser.status,
    });
    res.status(201).json({
      message: "User added",
      token,
      user: { id: result.insertId, ...newUser },
    });
  });
};

exports.updateUser = (req, res) => {
  const { name, email, password, status } = req.body;
  let updatedUser = {};
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email.toString().toLowerCase();
  if (password) updatedUser.password = password;
  if (status) updatedUser.status = status;

  let sql = "UPDATE users SET ? WHERE id = ?";
  db.query(sql, [updatedUser, req.params.id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: "User updated!", updated: updatedUser });
  });
};

exports.updateUsersStatus = (req, res) => {
  const { status, userIds } = req.body; // userIds is expected to be an array of IDs
  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).send("Invalid user IDs");
  }
  let sql = "UPDATE users SET status = ? WHERE id IN (?)";
  db.query(sql, [status, userIds], (err, result) => {
    if (err) return res.status(500).send(err.message);

    res.status(200).json({
      message: `${result.affectedRows} users updated!`,
      updatedStatus: status,
      affectedRows: result.affectedRows,
    });
  });
};

exports.deleteUser = (req, res) => {
  let sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: "User deleted" });
  });
};

exports.deleteUsers = (req, res) => {
  const userIds = req.query?.userIds?.split(','); // Expecting an array of user IDs in the request body
  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).send("Invalid user IDs");
  }
  let sql = "DELETE FROM users WHERE id IN (?)";
  db.query(sql, [userIds], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: `${result.affectedRows} users deleted` });
  });
};
