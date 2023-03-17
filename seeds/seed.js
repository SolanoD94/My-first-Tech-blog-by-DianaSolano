const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userSeedData = require("./userSeedData.json");
const blogSeedData = require("./blogSeedData.json");
const commentSeedData = require("./commentSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogSeedData);

  await Comment.bulkCreate(commentSeedData);

  process.exit(0);
};

seedDatabase();
