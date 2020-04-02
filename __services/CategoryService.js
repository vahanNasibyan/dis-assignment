/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const db = require('../dal/models');

class CategoryService {
  constructor() {
    this.model = db.Category;
  }

  async get() {
    return this.model.findAll({
      where: {
        disabled: false,
      },
      returning: true,
      raw: true,
    });
  }
}
const CategoryServiceInstance = new CategoryService();
module.exports = CategoryServiceInstance;
