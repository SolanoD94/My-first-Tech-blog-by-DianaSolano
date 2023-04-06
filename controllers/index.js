const router = require("express").Router();

const userRoutes = require("./user-dashboard");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./open-posts");
const apiRoutes = require("./api");

router.use("/my-dashboard", userRoutes);
router.use("/", homeRoutes);
router.use("/user-posts", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
