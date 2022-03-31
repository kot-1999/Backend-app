import {Request, Response, NextFunction} from "express";
import { isNaN, isNumber, isString, toString } from "lodash";



function response400(message: string, res: Response){
  res.json({
    "status": 400,
    "messages": [
      {
        "message": message,
        "type": "BAD REQUEST"
      }
    ]
  })
}

export const  requestBodyValidationMiddleware = () => {
  /*
  * Checks all key parameters and their values
  * */
  return(req: Request, res: Response, next: NextFunction) => {
    const keys: string[] = ["firstName", "lastName", "birthdate", "weight", "height", "identificationNumber", "gender", "diagnoseID"];

    for(let i =0; i < keys.length; i++){
      if(!(keys[i] in req.body)){
        response400(`Missing parameter: ${keys[i]}`, res);
        return;
      }
    }

    if(!isString(req.body.firstName) ||  req.body.firstName.length < 3 || req.body.firstName.length > 25 ) {
      response400('Wrong value of: firstName', res);
      return;
    }
    if(!isString(req.body.lastName) ||  req.body.lastName.length < 3 || req.body.lastName.length > 35 ) {
      response400('Wrong value of: lastName', res);
      return;
    }
    if(toString(new Date(req.body.birthdate)) === "Invalid Date") {
      response400('Wrong value of: birthdate', res);
      return;
    }
    if(!isString(req.body.identificationNumber)) {
      response400('Wrong value of: identificationNumber', res);
      return;
    }
    if(!isString(req.body.gender) ||  (req.body.gender !== 'MALE' && req.body.gender !== 'FEMALE') ) {
      response400('Wrong value of: gender', res);
      return;
    }
    if(!isNumber(req.body.weight) || req.body.weight < 0){
      response400('Wrong value of: weight', res);
      return;
    }
    if(!isNumber(req.body.height) || req.body.height < 0){
      response400('Wrong value of: height', res);
      return;
    }
    if(!isNumber(req.body.diagnoseID) || req.body.diagnoseID < 0){
      response400('Wrong value of: diagnoseID', res);
      return;
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
      response400(`Wrong patientID: ${patientID}`, res);
    }else {
      return next();
    }
  }
}

export default {requestBodyValidationMiddleware, patientIdValidationMiddleware};