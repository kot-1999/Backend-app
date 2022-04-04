import {Request, Response, NextFunction} from "express";
import { isNaN, method } from "lodash";
import Joi from "joi";

enum Gender{
  MALE = 'MALE',
  FEMALE = 'FEMALE'
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

    console.log(value)
    if (error !== undefined) {
      res.json({
        "status": 400,
        "messages": [
          {
            "message": error.message,
            "type": "BAD REQUEST"
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
    console.log(patientID);
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