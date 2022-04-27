import {Router} from "express";
import PatientsRouter from './patients';
import SubstancesRouter from "./substances";
import UsersRouter from './users'
import passport from "passport";
import permissionMiddlewares from "../../middlewares/permissionMiddlewares";
import { UserRole } from "../../enums";

const router = Router();

export default () => {
  router.use('/v1/patients', PatientsRouter())

  router.use('/v1/substances',
    passport.authenticate(['jwt-api', 'jwt-admin']),
    permissionMiddlewares([UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    SubstancesRouter())

  router.use('/v1/users',
    passport.authenticate(['jwt-admin']),
    permissionMiddlewares([UserRole.SUPER_ADMIN]),
    UsersRouter())

  return router;
}