const sequelize = require("../config/connections");
const { User, Blog, Comment } = require("../models");

const userSeedData = require("./userData.json");
const blogSeedData = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogSeedData);

  process.exit(0);
};

seedDatabase();
