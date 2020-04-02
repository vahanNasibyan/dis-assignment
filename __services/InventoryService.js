/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const db = require('../dal/models');

class InventoryService {
  constructor() {
    this.model = db.Inventory;
  }

  async _getById(ctx) {
    const { id } = ctx.params;
    return this.model.findOne({ where: { id }, raw: true });
  }

  async _sellInventoryItem(ctx) {
    const { id, quantity } = ctx.params;
    return this.model.decrement('quantity', { by: quantity, where: { id } });
  }

  async deleteInventory(ctx) {
    const { id } = ctx.params;
    await this.model.update({ disabled: true }, { where: { id } });
    return true;
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

  async createInventory(ctx) {
    try {
      const { id } = ctx.meta.user;
      const {
        name, notes, quantity, price, category_id,
      } = ctx.params;
      const data = await this.model.create({
        name, notes, quantity, price, user_id: id, category_id,
      }, {
        returning: true,
        raw: true,
      });
      return await this.model.findOne({
        where: { id: data.id },
        include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }],
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateInventory(ctx) {
    try {
      const { id: userId, type } = ctx.meta.user;
      const {
        id, name, notes, quantity, price, category_id,
      } = ctx.params;
      const where = {
        id,
      };
      if (type === 'agent') {
        where.user_id = userId;
      }
      await this.model.update({
        name, notes, quantity, price, category_id,
      }, {
        where,
      });
      return await this.model.findOne({
        where: { id },
        include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }],
      });
    } catch (e) {
      throw e;
    }
  }

  async getInventories(ctx) {
    try {
      const { id, type } = ctx.meta.user;
      const {
        limit = 10, offset = 0, filter_field, filter_term, user_id,
      } = ctx.params;

      const where = [{ disabled: false }];
      if (type !== 'admin') {
        where.push({ user_id: id });
      }

      if (user_id) {
        where.push({ user_id });
      }

      if (filter_field === 'category_name') {
        where.push(db.Sequelize.literal(`"category"."name"::varchar ilike '%${filter_term}%'`));
      } else if (filter_field && filter_term) {
        where.push(db.Sequelize.literal(`"Inventory".${filter_field}::varchar ilike '%${filter_term}%'`));
      }

      return await this.model.findAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'desc']],
        include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }],
      });
    } catch (e) {
      throw e;
    }
  }
}
const InventoryServiceInstance = new InventoryService();
module.exports = InventoryServiceInstance;
