const express = require("express");
const fs = require("fs");
const path = require("path");
const USERS_FILE = path.join(__dirname, "users.json");
const app = express();
app.post("/user",(req,res)=>{
    const {name,age,email}=req.body
})
const newuser = {
  id: Date.now(),
  name,
  age,
  email,
};
