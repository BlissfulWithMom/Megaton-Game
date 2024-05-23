import IUserDao from '@dao/contracts/IUserDao.js';
import models from '@models/index.js';
import SuperDao from './SuperDao.js';

const User = models.user;

export default class UserDao extends SuperDao implements IUserDao {
    constructor() {
        super(User);
    }

    async findByUserName(userName: string) {
        return User.findOne({ where: { userName } });
    }

    async isUserNameExists(userName: string) {
        return User.count({ where: { userName } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }

    async createWithTransaction(user: object, transaction: object) {
        return User.create(user, { transaction });
    }
}
