import {Request, Response, NextFunction} from "express";
import { isNaN } from "lodash";
import Joi from "joi";
import { Gender } from "../enums";

interface Patient{
  firstName: string,
  lastName: string,
  birthdate: string,
  weight: number,
  height: number,
  identificationNumber: string,
  gender: Gender,
  diagnoseID: number,
}

const postSchema = Joi.object({
  firstName: Joi.string().min(3).max(25).required(),
  lastName: Joi.string().min(3).max(25).required(),
  birthdate: Joi.date().required(),
  weight: Joi.number().min(0.2).max(200).required(),
  height: Joi.number().min(10).max(250).required(),
  identificationNumber: Joi.string().length(12).required(),
  gender: Joi.valid(Gender.MALE, Gender.FEMALE).required(),
  diagnoseID: Joi.number().positive().required(),
})

const patchSchema = Joi.object({
  firstName: Joi.string().min(3).max(25),
  lastName: Joi.string().min(3).max(25),
  birthdate: Joi.date(),
  weight: Joi.number().min(0.2).max(200),
  height: Joi.number().min(10).max(250),
  identificationNumber: Joi.string().length(12),
  gender: Joi.valid(Gender.MALE, Gender.FEMALE),
  diagnoseID: Joi.number().positive(),

})

export const  requestBodyValidationMiddleware = () => {
  /*
  * Checks all key parameters and their values
  * */
  return(req: Request, res: Response, next: NextFunction) => {
    const { error, value } = (req.method === 'POST') ? postSchema.validate(req.body) : patchSchema.validate(req.body);

    if (error !== undefined) {
      res.json({
        "status": 400,
        "messages": [
          {
            "message": error.message,
            "type": "NOT VALID DATA"
          }
        ]
      });
      return
    }

    return next();
  }
}

export const  patientIdValidationMiddleware = () => {
  /*
  * Checks if patientID added to the path is correct
  * */
  return(req: Request, res: Response, next: NextFunction) => {
    const patientID: number = parseInt(req.params.patientID);
    if(isNaN(patientID) || patientID < 0 ){
      res.json({
        "status": 400,
        "messages": [
          {
            "message": `Wrong patientID: ${patientID}`,
            "type": "BAD REQUEST"
          }
        ]
      })
    }else {
      return next();
    }
  }
}

export default {requestBodyValidationMiddleware, patientIdValidationMiddleware};