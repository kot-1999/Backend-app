import { Request, Response} from "express";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patient_model";

export const workflow = async (req: Request, res: Response) => {
  /*
  * Updates existing patient
  * res: 200 if everything is ok
  * res: 204 if there is no such patient for updating
  * */


  const patientID: number = parseInt(req.params.patientID)

  try{
    const patient: PatientModel = await models.Patient.findOne({where: {id: patientID}})
    for (let key in req.body) {
      patient.set({[key]: req.body[key] })
    }
    await patient.save()
    res.json({
      "status": 200,
      "messages": [
        {
          "message": `Patient ${patientID} was patched`,
          "type": "SUCCESS"
        }
      ],
      "patient": {
        "id": patientID
      }
    })
  }
  catch (e) {
    res.json({
      "status": 204,
      "messages": [
        {
          "message": e.message,
          "type": "FAIL"
        }
      ],
      "patient": {
        "id": patientID
      }
    });
  }
}