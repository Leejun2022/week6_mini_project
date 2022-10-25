const express = require("express");
const router = express.Router();
// const pageRouter = require("./routes/page");
const authRouter = require("./auth");
const userRouter = require("./users.routes");
const postsRouter = require('./posts.routes');
const commentRouter = require('./comments.routes')
const recommentRouter = require('./recomments.routes')


router.use('/posts/', postsRouter);
router.use("/comments", commentRouter);
router.use("/comments/recomments", recommentRouter);
router.use("/users", [userRouter]);
// router.use("/", pageRouter);
router.use("/auth", authRouter);

module.exports = router;