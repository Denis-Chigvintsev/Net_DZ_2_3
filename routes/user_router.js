const express = require('express');
const userRouter = express.Router();
const app = require('../app.js');

class User {
  constructor(user_ID, email = 'test@mail.ru') {
    this.user_ID = user_ID;
    this.email = email;
  }
}

////
function postNewUser(req, res) {
  const { users } = app.store;
  const { user_ID } = req.body;
  const newUser = new User(user_ID);
  users.push(newUser);
  res.status(201);
  res.send(newUser);
}

userRouter.post('/', postNewUser); ////

module.exports = userRouter;
