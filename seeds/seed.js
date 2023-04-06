const sequelize = require("../config/connections");
const { User, Blog, Comments } = require("../models");

const userSeedData = require("./userData.json");
const blogSeedData = require("./blogData.json");
const commentsSeedData = require("./commentsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogSeedData);
  await Comments.bulkCreate(commentsSeedData);

  process.exit(0);
};

seedDatabase();
