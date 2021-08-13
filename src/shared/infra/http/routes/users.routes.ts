import {Router} from 'express';
import multer from "multer";

import uploadConfig from '../../../../config/upload';

import {ensureAuthenticated} from '../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { ProfileUserController } from '../../../../modules/cars/useCases/profileUserUseCase/ProfileUserController';


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController;
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", 
ensureAuthenticated,
uploadAvatar.single("avatar"),
updateUserAvatarController.handle);

usersRoutes.get("/", ensureAuthenticated, profileUserController.handle);

export { usersRoutes }