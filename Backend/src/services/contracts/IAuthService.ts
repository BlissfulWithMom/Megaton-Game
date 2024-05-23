import { Request, Response } from 'express';
import { ApiServiceResponse } from '../../types/apiServiceResponse';

export default interface IAuthService {
    loginWithUserNamePassword: (userName: string, password: string) => Promise<ApiServiceResponse>;
    logout: (req: Request, res: Response) => Promise<boolean>;
}
