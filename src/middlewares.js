const db = require("./models/db");
const jwt = require("./config/jwt");

exports.auth = (req, res, next) => {
  let token = req.header("Authorization")?.split(" ")[1];
  if (!token) token = req.headers.cookie?.split("accessToken=")[1];

  if (!token)
    return res.status(401).send("No token, authorization denied");

  try {
    const decoded = jwt.verifyToken(token, "access");
    if (!decoded) return res.status(403).send("Invalid token");
    req.decoded = decoded;

    let sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [decoded.id], (err, result) => {
      if (err) throw err;
      const user = result[0];
      if (!user || (user && user.status !== "active")) {
        return res.status(400).json({ reAuthRequired: true });
      }

      next();
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};
