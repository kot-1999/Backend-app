import { Request, Response} from "express";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patient_model";
import { DiagnoseModel } from "../../../db/models/diagnose_model";
import { Gender } from "../../../enums";

export interface Patient{
  firstName: string,
  lastName: string,
  birthdate: string,
  weight: number,
  height: number,
  identificationNumber: string,
  gender: Gender,
  diagnoseID: number,
}

export const workflow = async (req: Request, res: Response) => {

  const {body} = req
  const patientID: number = parseInt(req.params.patientID)
  try{

    const patient: PatientModel = await models.Patient.findOne({where: {id: patientID}})
    // Check if v1 exists
    if(!patient){
      return res.status(404).json({
        "messages": [
          {
            "details": `Patient: ${patientID} was not found`,
            "type": "NOT FOUND"
          }
        ]
      })
    }

    // Check if diagnose exists
    if(body.diagnoseID) {
      const diagnose: DiagnoseModel = await models.Diagnose.findOne({ where: { id: body.diagnoseID } });
      if (!diagnose) {
        return res.status(404).json({
          "messages": [
            {
              "details": `Diagnose: ${body.diagnoseID} was not found`,
              "type": "NOT FOUND"
            }
          ]
        });
      }
    }

    for (let key in body) {
      patient.set({[key]: body[key] })
    }

    await patient.save()
    return res.status(200).json({
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
    return res.status(400).json({
      "messages": [
        {
          "message": e.message,
          "type": "FAIL"
        }
      ]
    });
  }
}