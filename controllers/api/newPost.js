const router = require("express").Router();
const { Blog, User, Comments } = require("../../models");
const { readAndAppend } = require("../../utils/fsUtils");
const withAuth = require("../../utils/auth");

// CREATE new post
router.post("/", withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const user_id = req.session.userId;
      const { blog_title, description } = req.body;
      if (!req.body || !user_id) {
        return res.status(400).json({ error: "Missing values" });
      }
      const newPost = await Blog.create({
        blog_title,
        description,
        user_id,
      });
      console.log(newPost);
      res.status(200).json({ message: "Post added", blog: newPost });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// DELETE post
router.delete("/:blog_id", async (req, res) => {
  try {
    const { blog_id } = req.params;
    const deletePost = await Blog.destroy({
      where: {
        id: blog_id,
      },
    });
    if (deletePost === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Deleted Post!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE post
router.put("/:blog_id", async (req, res) => {
  try {
    const { blog_id } = req.params;
    const updatePost = await Blog.update(
      { blog_title: req.body.blog_title, description: req.body.description },
      {
        where: {
          id: blog_id,
        },
      }
    );
    return res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
