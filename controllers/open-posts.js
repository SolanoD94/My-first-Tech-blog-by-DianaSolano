const router = require("express").Router();
const { Blog, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

// This data will be rendered when the user clicks on "See more posts from this author"
// This is the dashboard to display all posts from the same user.
// GET one user and includes the blogposts of each user.

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Blog }],
    });
    const userPosts = userData.get({ plain: true });

    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    console.log(userPosts);
    res.render("userPosts", { userPosts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
