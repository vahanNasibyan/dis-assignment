const { Errors } = require('moleculer-web');
// const db = require('../dal/models');

const { ForbiddenError } = Errors;
class PermissionService {
  constructor() {
    this.checkPermissionGranted = this.checkPermissionGranted.bind(this);
  }

  async checkPermissionGranted(permission, userId) {
    try {
      const permissionUser = await this.db.PermissionUserModel.findOne({
        where: {
          user_id: userId,
        },
        include: {
          model: this.db.PermissionModel,
          as: 'Permission',
          where: {
            name: permission,
            type: 'user',
          },
        },
      });
      if (!permissionUser || !permissionUser.Permission) {
        throw new ForbiddenError(403, `User Permission Denied! - ${userId}`);
      } else {
        return true;
      }
    } catch (e) {
      console.log(e);
      throw new ForbiddenError(e);
    }
  }
}

module.exports = PermissionService;
