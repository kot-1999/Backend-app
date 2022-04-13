import { Request, Response} from "express";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patient_model";



export const workflow = async (req: Request, res: Response) => {

  const patientID: number = parseInt(req.params.patientID)

  try{
    const patient: PatientModel = await models.Patient.findOne({where: {id: patientID}})
    if(!patient){
      res.json({
        "status": 404,
        "messages": [{
            "message": `Patient: ${patientID} was not found`,
            "type": "NOT FOUND"
        }]
      })
    }
    await models.Patient.destroy({ where: { id: patientID } })
    res.json({
      "status": 200,
      "messages": [{
          "message": `Patient ${patientID} was deleted`,
          "type": "SUCCESS"
      }]
    })
  }catch (e){
    res.json({
      "status": 400,
      "messages": [{
          "message": e.message,
          "type": "ERROR"
      }]
    })
  }



}