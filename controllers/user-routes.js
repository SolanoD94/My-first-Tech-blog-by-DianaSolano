const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");

//GET User by Id
router.get("/:id", async (req, res) => {
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
    res.render("dashboard", { userPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new post
router.post("/newPost", async (req, res) => {
  try {
    const { blog_title, description } = req.body;
    if (req.body)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // req.session.save(() => {
    //   req.session.loggedIn = true;

    // });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const dbUserData = await User.findOne({
//       where: {
//         [Op.or]: [{ email: req.body.email }, { user_name: req.body.name }],
//       },
//     });

//     if (!dbUserData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password. Please try again!" });
//       return;
//     }

//     const validPassword = await dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password. Please try again!" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;
//       console.log(
//         "🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie",
//         req.session.cookie
//       );

//       res
//         .status(200)
//         .json({ user: dbUserData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Logout
// router.post("/logout", (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
