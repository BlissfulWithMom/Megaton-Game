import { Op } from "sequelize";
import User from "../models/user.model";

interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(searchParams: { first_name?: string, last_name?: string, userName?: string, userName_verified?: number }): Promise<User[]>;
  retrieveById(userId: number): Promise<User | null>;
  update(user: User): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    try {
      return await User.create({
        first_name: user.first_name,
        last_name: user.last_name,
        userName: user.userName,
        userName_verified: user.userName_verified,
        created_at: user.created_at,
        updated_at: user.updated_at
      });
    } catch (err) {
      throw new Error("Failed to create User!");
    }
  }

  async retrieveAll(searchParams: { first_name?: string, last_name?: string, userName?: string, userName_verified?: number }): Promise<User[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.first_name)
        condition.first_name = { [Op.iLike]: `%${searchParams.first_name}%` };
      if (searchParams?.last_name)
        condition.last_name = { [Op.iLike]: `%${searchParams.last_name}%` };
      if (searchParams?.userName)
        condition.userName = { [Op.iLike]: `%${searchParams.userName}%` };
      if (searchParams?.userName_verified !== undefined)
        condition.userName_verified = searchParams.userName_verified;

      return await User.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

  async retrieveById(userId: number): Promise<User | null> {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

  async update(user: User): Promise<number> {
    const { id, first_name, last_name, userName, userName_verified, created_at, updated_at } = user;

    try {
      const affectedRows = await User.update(
        { first_name, last_name, userName, userName_verified, created_at, updated_at },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update User!");
    }
  }

  async delete(userId: number): Promise<number> {
    try {
      const affectedRows = await User.destroy({ where: { id: userId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete User!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return User.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Users!");
    }
  }
}

export default new UserRepository();
