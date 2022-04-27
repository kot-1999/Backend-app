import { Router } from "express";
import * as GetUsers from './get.users'
import * as PostUsers from './post.users'
import * as DeleteUsers from './delete.users'
import { requestBodyValidationMiddleware } from "../../../middlewares/validationMiddlewares";

const router = Router()

export default () => {
  router.get('/', GetUsers.get_all_users)
  router.post('/', requestBodyValidationMiddleware(), PostUsers.workflow)
  router.delete('/:userID', DeleteUsers.workflow)
  router.get('/:userID', GetUsers.get_user_by_id)
  return router
}