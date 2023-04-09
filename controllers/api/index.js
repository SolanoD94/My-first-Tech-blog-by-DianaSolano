const router = require("express").Router();

const userRoutes = require("./user");
const newPostRoute = require("./newPost");

router.use("/user", userRoutes);
router.use("/newPost", newPostRoute);

module.exports = router;
