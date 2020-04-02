/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const db = require('../dal/models');

class SaleService {
  constructor() {
    this.model = db.Sale;
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

  async sale(ctx) {
    try {
      const { id: user_id } = ctx.meta.user;
      const {
        name, quantity, inventory_id, age_range_id, gender, phone_number, sell_price,
      } = ctx.params;

      const inventoryItem = await ctx.broker.call('v1.inventory.getById', { id: inventory_id });
      console.log(inventoryItem);
      if (!inventoryItem) {
        throw new Error('Item Not found');
      }
      if (inventoryItem.quantity < quantity) {
        throw new Error('Inventory available quantity is less than sell quantity');
      }
      const {
        price: price_per_item,
      } = inventoryItem;
      const total = (sell_price || price_per_item) * quantity;
      const saleItem = await this.model.create({
        name,
        quantity,
        price_per_item,
        total,
        user_id,
        sell_price,
        inventory_id,
        age_range_id,
        gender,
        phone_number,
      }, {
        returning: true,
        raw: true,
      });
      await ctx.broker.call('v1.inventory.sellInventoryItem', { id: inventory_id, quantity });
      await ctx.broker.call('v1.user.updateUserDataAfterSale', { total, quantity, user_id });
      // await ctx.broker.call('v1.achievement.sellInventoryItem', { id: inventory_id, quantity });

      return saleItem;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getSales(ctx) {
    try {
      const { id, type } = ctx.meta.user;
      const {
        limit = 10, offset = 0, filter_field, filter_term, start_date, end_date, user_id,
      } = ctx.params;


      const where = [{}];
      if (type !== 'admin') {
        where.push({ user_id: id });
      }

      if (user_id) {
        where.push({ user_id });
      }
      if (start_date && end_date) {
        where.push({
          createdAt: { [db.Sequelize.Op.between]: [start_date, end_date] },
        });
      }
      if (filter_field && filter_term) {
        where.push(db.Sequelize.literal(`"inventory".${filter_field}::varchar ilike '%${filter_term}%'`));
      }

      return await this.model.findAndCountAll({
        where,
        limit,
        offset,
        include: [{
          model: db.Inventory,
          as: 'inventory',
          attributes: ['id', 'name', 'quantity', 'price', 'category_id'],
        },
        { model: db.User, as: 'user', attributes: ['id', 'username', 'first_name', 'last_name', 'type'] }],
      });
    } catch (e) {
      throw e;
    }
  }
}
const SaleServiceInstance = new SaleService();
module.exports = SaleServiceInstance;
