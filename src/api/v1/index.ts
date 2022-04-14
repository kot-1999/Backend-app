import {Router} from "express";
import PatientsRouter from './patients';

const router = Router();

export default () => {
  router.use('/v1/patients', PatientsRouter());

  return router;
}