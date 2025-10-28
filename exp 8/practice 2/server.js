const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "mySecretKey"; // should be in .env file ideally

// 🔹 Dummy user
const user = {
  id: 1,
  username: "testuser",
  password: "password123"
};

// 🔹 Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: "1h"
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// 🔹 Middleware to Verify Token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// 🔹 Protected Route
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user
  });
});

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
