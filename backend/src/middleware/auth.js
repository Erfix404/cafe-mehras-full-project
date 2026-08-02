// backend/src/middleware/auth.js — minimal admin auth (HMAC token)
const crypto = require("crypto");

function sign(username) {
  const secret = process.env.ADMIN_SECRET || "change-me";
  return crypto
    .createHmac("sha256", secret)
    .update(username)
    .digest("hex");
}

function auth(req, res, next) {
  const token = req.headers["x-admin-token"];
  const username = req.headers["x-admin-user"] || "admin";
  if (!token || token !== sign(username)) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  next();
}

module.exports = { sign, auth };
