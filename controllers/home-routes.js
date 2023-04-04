const router = require("express").Router();
const { Blog, User, Comments } = require("../models");

// This route gets the data for the homepage.
// This will display all posts from the database, organized by creation date.

//get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }, { model: Comments }],
      order: [["createdAt", "DESC"]],
    });
    const blogPosts = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogPosts);
    res.render("homepage", { blogPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO LOGIN
// IF LOGGED IN RENDER HOME
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//GET ROUTE TO SIGN IN
router.get("/signin", async (req, res) => {
  try {
    const newUserData = await User.findAll({});
    const newUser = newUserData.map((user) => user.get({ plain: true }));
    console.log(newUser);
    res.render("signin", {
      newUser,
      countVisit: req.session.countVisit,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
