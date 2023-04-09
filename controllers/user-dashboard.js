const router = require("express").Router();
const { Blog, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

//GET User by Id
router.get("/", withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await User.findByPk(userId, {
      include: [{ model: Blog }],
    });
    const userPosts = userData.get({ plain: true });

    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    console.log(userPosts);
    res.render("dashboard", {
      id: userId,
      userPosts,
      countVisit: req.session.countVisit,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
