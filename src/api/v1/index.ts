import {Router} from "express";
import PatientsRouter from './patients';
import SubstancesRouter from "./substances";

const router = Router();

export default () => {
  router.use('/v1/patients', PatientsRouter());
  router.use('/v1/substances', SubstancesRouter())
  return router;
}