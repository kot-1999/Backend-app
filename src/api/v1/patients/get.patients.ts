import { Request, Response} from "express";
import { isNumber, isString, toString } from "lodash";
const fs = require('fs');

export const workflow = (req: Request, res: Response) => {
  /*
  * Returns all patients
  * res: 200 if everything is ok
  * */

  let patients: any[] = JSON.parse(fs.readFileSync('./src/api/v1/patients/patients.json'))
  console.log(req.query)

  if(req.query.gender)
    patients = patients.filter(patient => patient.gender === req.query.gender)

  if(req.query.order) {
    let params: string[] = toString(req.query.order).split(':')
    console.log(patients[0][params[0]])
    patients = patients.sort((a, b) => {
      if(isString(a[params[0]]))
        return toString(a[params[0]]).localeCompare(toString(b[params[0]]));
      else if(isNumber(a[params[0]])){
        if(a[params[0]] > b[params[0]])
          return 1
        else if(a[params[0]] < b[params[0]])
          return -1
        else return 1
      }
    })
  }
  res.json({
    "status": 200,
    "patients": {

      "patients": patients

    }
  })
}

export const workflow2 = (req: Request, res: Response) => {
  /*
  * Returns the patient by patientID added to the path
  * res: 200 if everything is ok
  * res: 204 if there is no such patient
  * */

  let patients: {
    id: number
  }[] = JSON.parse(fs.readFileSync('./src/api/v1/patients/patients.json'))

  const patientID: number = parseInt(req.params.patientID)
  for(let i:number = 0; i < patients.length; i++){
    if(patientID === patients[i].id){
      res.json({
        "status": 200,
        "patient": patients[i]
      })
      return
    }
  }

  res.json({
    "status": 204,
    "messages": [
      {
        "message": `Patient: ${patientID} was not found`,
        "type": "NO CONTENT"
      }
    ]
  })
}