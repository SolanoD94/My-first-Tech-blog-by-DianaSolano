const router = require("express").Router();

const userRoutes = require("./user-routes");
const homeRoutes = require("./home-routes");
const blogPostRoutes = require("./blogpost");
const dashboardRoutes = require("./dashboard");

router.use("/my-dashboard", userRoutes);
router.use("/", homeRoutes);
router.use("/post", blogPostRoutes);
router.use("/users", dashboardRoutes);

module.exports = router;
