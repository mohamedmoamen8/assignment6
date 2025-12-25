const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const USERS_FILE = path.join(__dirname, "users.json");


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

app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  const users = readUsers();
  const userIndex = users.findIndex(u => u.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (email) {
    const emailUsed = users.find(u => u.email === email && u.id != id);
    if (emailUsed) {
      return res.status(400).json({ message: "Email already exists" });
    }
  }

  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(age && { age }),
    ...(email && { email })
  };

  writeUsers(users);
  res.json({ message: "User updated", user: users[userIndex] });
});
app.delete("/user/:id", (req, res) => {
  const id = req.params.id || req.body.id;

  const users = readUsers();
  const newUsers = users.filter(u => u.id != id);

  if (users.length === newUsers.length) {
    return res.status(404).json({ message: "User not found" });
  }

  writeUsers(newUsers);
  res.json({ message: "User deleted" });
});


app.get("/user/getByName", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Name query is required" });
  }

  const users = readUsers();

  const user = users.find(
    u => u.name.toLowerCase().trim() === name.toLowerCase().trim()
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});



app.get("/user/filter", (req, res) => {
  const minAge = Number(req.query.minAge);

  const users = readUsers();
  const filtered = users.filter(u => u.age >= minAge);

  res.json(filtered);
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const users = readUsers();
  const user = users.find(u => u.id == id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
