import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRoutes = express.Router();

userRoutes.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRoutes.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRoutes.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRoutes.route('/getAllPendingUsers').get(
    (req, res) => new UserController().getAllPendingUsers(req, res)
)

userRoutes.route('/getAllUsers').get(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRoutes.route('/acceptUser').post(
    (req, res) => new UserController().acceptUser(req, res)
)

userRoutes.route('/declineUser').post(
    (req, res) => new UserController().declineUser(req, res)
)


userRoutes.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRoutes.route('/updateUser').post(
    (req, res) => new UserController().updateUser(req, res)
)

userRoutes.route('/updateSeller').post(
    (req, res) => new UserController().updateSeller(req, res)
)

userRoutes.route('/addFavourite').post(
    (req, res) => new UserController().addFavourite(req, res)
)

userRoutes.route('/removeFavourite').post(
    (req, res) => new UserController().removeFavourite(req, res)
)

userRoutes.route('/checkUsername').post(
    (req, res) => new UserController().checkUsername(req, res)
)

userRoutes.route('/checkEmail').post(
    (req, res) => new UserController().checkEmail(req, res)
)

export default userRoutes;