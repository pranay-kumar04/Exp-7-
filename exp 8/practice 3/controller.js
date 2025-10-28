import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { id, username, password, role } = req.body;

  // simple check (you can hardcode users here)
  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const token = jwt.sign(
    { id, username, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
