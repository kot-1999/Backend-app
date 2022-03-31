import {Router} from "express";
import PatientsRouter from './patients';

const router = Router();

export default () => {
  router.use('/patients', PatientsRouter());

  return router;
}