import { Request, Response} from "express";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patient_model";
import { DiagnoseModel } from "../../../db/models/diagnose_model";

export const workflow = async (req: Request, res: Response) => {

  const {body, path, url} = req


  const patientID: number = parseInt(req.params.patientID)

  try{

    const patient: PatientModel = await models.Patient.findOne({where: {id: patientID}})
    // Check if patient exists
    if(!patient){
      return res.json({
        "status": 404,
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
        return res.json({
          "status": 404,
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
    return res.json({
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
    return res.json({
      "status": 400,
      "messages": [
        {
          "message": e.message,
          "type": "FAIL"
        }
      ]
    });
  }
}