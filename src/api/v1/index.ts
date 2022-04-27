import {Router} from "express";
import PatientsRouter from './patients';
import SubstancesRouter from "./substances";
import UsersRouter from './users'

const router = Router();

export default () => {
  router.use('/v1/patients', PatientsRouter())
  router.use('/v1/substances', SubstancesRouter())
  router.use('/v1/users', UsersRouter())

  return router;
}