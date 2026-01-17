const express = require("express");
const fs = require("fs");
const path = require("path");
const USERS_FILE = path.join(__dirname, "users.json");
const app = express();
app.use(express.json());
function readUsers() {
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
app.post("/user", (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const users = readUsers();

  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    age,
    email
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added", user: newUser });
});
app.get("/user/filter", (req, res) => {
  const minAge = Number(req.query.minAge);
  const users = readUsers();
  const filtered = users.filter(u => u.age >= minAge);

  res.json(filtered);
});
app.listen(3003, () => {
  console.log("Server running on port 3003");
});
