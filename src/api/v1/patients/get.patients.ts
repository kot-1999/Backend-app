import { Request, Response} from "express";
import { toNumber, toString } from "lodash";
import { PatientModel } from "../../../db/models/patient_model";
import { models } from "../../../db";


export const  get_all_patients = async (req: Request, res: Response) => {
  /*
  * Returns the patient by patientID added to the path
  * res: 200 if everything is ok
  * res: 204 if there is no such patient
  * */
  let options: any = {}
  console.log(req.query)
  if(req.query.gender)
    options.where = { gender: req.query.gender }
  if(req.query.order)
    options.order = [toString(req.query.order).split(':')]
  if(req.query.limit)
    options.limit = req.query.limit
  if(req.query.page)
    options.offset = (req.query.limit) ? toNumber(req.query.limit) * toNumber(req.query.page) : req.query.page

  const patients: PatientModel[] = await models.Patient.findAll(options)

  if(patients) {
    res.json({
      "status": 200,
      "patients": patients
    });
    return
  }

  res.json({
    "status": 204,
    "messages": [
      {
        "message": `No patients were found`,
        "type": "NO CONTENT"
      }
    ]
  })
}


export const get_patient_by_id = async (req: Request, res: Response) => {
  /*
  * Returns all patients
  * res: 200 if everything is ok
  * */

  const patientID: number = parseInt(req.params.patientID)
  const patient: PatientModel = await models.Patient.findOne({where: {id: patientID}})
  if(patient) {
    res.json({
      "status": 200,
      "patient": patient
    });
    return
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

