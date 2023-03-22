const router = require("express").Router();
const { Blog, User } = require("../models");

//get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });
    const blogPosts = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", { blogPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Login route
// router.get("/login", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//   res.render("login");
// });

module.exports = router;
