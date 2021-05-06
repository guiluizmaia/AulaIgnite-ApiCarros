import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    
    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const {sub: user_id} = verify(token, "2446e1d6710e403270bec14f4188fc7c") as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists!", 401);
            
        }
        next();
    } catch{
        throw new AppError("Invalid token", 401)
    }
}