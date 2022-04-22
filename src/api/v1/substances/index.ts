import { Router } from "express";
import * as GetSubstance from './get.substances'

const router = Router();

export default () => {
  router.get('/amount', GetSubstance.get_substance_amount);

  return router;
}