const express = require("express");
const router = express.Router();
const authLoginMiddleware = require("../middlewares/authLoginMiddleware");
const authMiddleware = require("../middlewares/auth-middleware");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/signup", authLoginMiddleware, usersController.userSignup);
router.post("/login", authLoginMiddleware, usersController.userLogin);
router.put("/nickname", authMiddleware, usersController.updatUser);
router.delete("/deluser", authMiddleware, usersController.deleUser);

module.exports = router;
