import { Router } from "express";
import * as GetPatients from './get.patients';
import * as PostPatients from './post.patients'
import * as DeletePatients from './delete.patients'
import * as PatchPatients from './patch.patient'

import {
  patientIdValidationMiddleware,
  requestBodyValidationMiddleware
} from "../../../middlewares/validationMiddlewares";

const router = Router();

export default () => {
  router.get('/', GetPatients.get_all_patients);
  router.post('/', requestBodyValidationMiddleware(), PostPatients.workflow)
  router.delete('/:patientID', patientIdValidationMiddleware(), DeletePatients.workflow)
  router.get('/:patientID', patientIdValidationMiddleware(), GetPatients.get_patient_by_id);
  router.patch('/:patientID', patientIdValidationMiddleware(), requestBodyValidationMiddleware(), PatchPatients.workflow);
  return router;
}