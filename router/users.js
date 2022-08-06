const express = require('express');
const UserController = require('../controller/user'); 
const registerMiddleware = require('../middleware/validationMiddleware');
const authorizationWorker = require('../middleware/authorization');
const user = new UserController(); 
const userRouter = express.Router();

userRouter.post("/register/client", registerMiddleware, user.registerClient); 
userRouter.post("/register/worker", registerMiddleware, user.registerWorker); 
userRouter.post("/login", user.login); 

module.exports = userRouter;
