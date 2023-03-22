const router = require("express").Router();
const { Blog, User } = require("../models");

// This route gets the data for the homepage.
// This will display all posts from the database, organized by creation date.

//get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
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
