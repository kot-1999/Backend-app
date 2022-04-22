import {Request, Response, NextFunction} from "express";
import { isNaN } from "lodash";
import Joi from "joi";
import { Gender, PatientHeight, PatientWeight } from "../enums";

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
  weight: Joi.number().min(PatientWeight.MIN).max(PatientWeight.MAX),
  height: Joi.number().min(PatientHeight.MIN).max(PatientHeight.MAX),
  identificationNumber: Joi.string().length(12),
  gender: Joi.valid(Gender.MALE, Gender.FEMALE),
  diagnoseID: Joi.number().positive(),

})

export const  requestBodyValidationMiddleware = () => {
  return(req: Request, res: Response, next: NextFunction) => {
    const { error, value } = (req.method === 'POST') ? postSchema.validate(req.body) : patchSchema.validate(req.body);

    if (error !== undefined) {
      res.status(400).json({
        "messages": [{
          "message": error.message,
          "type": "NOT VALID DATA"
        }]
      });
      return
    }

    return next();
  }
}

export const  patientIdValidationMiddleware = () => {
  return(req: Request, res: Response, next: NextFunction) => {
    const patientID: number = parseInt(req.params.patientID);
    if(isNaN(patientID) || patientID < 0 ){
      res.status(400).json({
        "messages": [{
          "message": `Wrong patientID: ${patientID}`,
          "type": "BAD REQUEST"
        }]
      })
    }else {
      return next();
    }
  }
}

export const  getParamsValidationMiddleware = () => {
  return(req: Request, res: Response, next: NextFunction) => {
    const allowedKeys = ['order', 'limit', 'page', 'gender']
    for (let key in req.query) {
      if(!allowedKeys.includes(key)){
        return res.status(400).json({
          "messages": [{
            "message": `Unexpected key: ${key}`,
            "type": "BAD REQUEST"
          }]
        })
      }
    }
    return next();

  }
}

export default {requestBodyValidationMiddleware, patientIdValidationMiddleware, getParamsValidationMiddleware};