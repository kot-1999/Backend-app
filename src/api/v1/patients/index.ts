import { Router } from "express";
import * as GetPatients from './get.patients';
import * as PostPatients from './post.patients'
import * as DeletePatients from './delete.patients'
import * as PatchPatients from './patch.patient'

import {
  getParamsValidationMiddleware,
  idValidationMiddleware,
  requestBodyValidationMiddleware
} from "../../../middlewares/validationMiddlewares";

const router = Router();

export default () => {
  router.get('/', getParamsValidationMiddleware(), GetPatients.get_all_patients);
  router.post('/', requestBodyValidationMiddleware(), PostPatients.workflow)
  router.delete('/:patientID', idValidationMiddleware(), DeletePatients.workflow)
  router.get('/:patientID', idValidationMiddleware(), GetPatients.get_patient_by_id);
  router.patch('/:patientID', idValidationMiddleware(), requestBodyValidationMiddleware(), PatchPatients.workflow);
  return router;
}