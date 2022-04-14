import { Request, Response} from "express";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patient_model";



export const workflow = async (req: Request, res: Response) => {

  const patientID: number = parseInt(req.params.patientID)

  try{
    const patient: PatientModel = await models.Patient.findOne({where: {id: patientID}})
    if(!patient){
      return res.status(404).json({
        messages: [{
            message: `Patient: ${patientID} was not found`,
            type: "NOT FOUND"
        }]
      })
    }
    await models.Patient.destroy({ where: { id: patientID } })
    res.status(200).json({
      messages: [{
          message: `Patient ${patientID} was deleted`,
          type: "SUCCESS"
      }],
      patient: {
        id: patientID
      }
    })
  }catch (e){
    res.status(400).json({
      messages: [{
          message: e.message,
          type: "ERROR"
      }]
    })
  }



}