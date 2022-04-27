import { Router } from "express";
import * as GetPatients from "./get.patients";
import * as PostPatients from "./post.patients";
import * as DeletePatients from "./delete.patients";
import * as PatchPatients from "./patch.patient";

import {
  getParamsValidationMiddleware,
  requestBodyValidationMiddleware
} from "../../../middlewares/validationMiddlewares";
import passport from "passport";
import permissionMiddlewares, { checkAccessPermissions } from "../../../middlewares/permissionMiddlewares";
import { UserRole } from "../../../enums";

const router = Router();

export default () => {
  router.get('/',
    passport.authenticate(['jwt-admin']),
    permissionMiddlewares([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    getParamsValidationMiddleware(),
    GetPatients.get_all_patients);

  router.post('/',
    passport.authenticate(['jwt-admin']),
    permissionMiddlewares([UserRole.SUPER_ADMIN]),
    requestBodyValidationMiddleware(),
    PostPatients.workflow)

  router.delete('/:patientID',
    passport.authenticate(['jwt-admin']),
    permissionMiddlewares([UserRole.SUPER_ADMIN]),
    DeletePatients.workflow)

  router.get('/:patientID',
    passport.authenticate(['jwt-api', 'jwt-admin']),
    permissionMiddlewares([UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    checkAccessPermissions(),
    GetPatients.get_patient_by_id);

  router.patch('/:patientID',
    passport.authenticate(['jwt-admin']),
    permissionMiddlewares([UserRole.SUPER_ADMIN]),
    requestBodyValidationMiddleware(),
    PatchPatients.workflow);
  return router;
}