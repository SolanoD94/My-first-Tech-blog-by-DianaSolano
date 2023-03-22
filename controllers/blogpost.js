const router = require("express").Router();
const { Blog, User } = require("../models");

//This route gets the data of each individual post.

router.get("/post/:id", async (req, res) => {
  try {
    const dbPost = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const eachPost = dbPost.map((post) => post.get({ plain: true }));
    res.status(200).json(eachPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
