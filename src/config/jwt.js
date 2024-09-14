const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

class JWT {
  #accessTokenSecret;
  #accessTokenExpiresIn;

  constructor(options) {
    if (!options.accessTokenSecret) {
      throw new Error("accessTokenSecret must be provided");
    } else if (typeof options.accessTokenSecret !== "string") {
      throw new Error("accessTokenSecret must be of string type");
    }

    this.#accessTokenSecret = options.accessTokenSecret;
    this.#accessTokenExpiresIn = options.accessTokenExpiresIn || "1h";
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.#accessTokenSecret, {
      expiresIn: this.#accessTokenExpiresIn,
    });
  }

  verifyToken(token) {
    try {
      const secret = this.#accessTokenSecret;
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}

let jsonwebtoken;

try {
  jsonwebtoken = new JWT({
    accessTokenSecret: accessTokenSecret,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
} catch (error) {
  console.log("JWT initialization error: ", error.message, " Existing...");
  process.exit(1);
}

module.exports = jsonwebtoken;
