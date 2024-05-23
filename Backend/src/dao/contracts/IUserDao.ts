import { IUser } from '../../models/interfaces/IUser';

export default interface IUserDao {
    findByUserName: (userName: string) => Promise<IUser>;
    isUserNameExists: (userName: string) => Promise<boolean>;
    createWithTransaction: (user: object, transaction: object) => Promise<IUser>;
}
