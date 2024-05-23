export interface IUser {
    id?: number;
    uuid: string;
    first_name: string;
    last_name: string;
    userName: string;
    password?: string;
    userName_verified?: number;
    status?: number;
    address?: string;
    phone_number?: string;
    created_at?: Date;
    updated_at?: Date;
}
