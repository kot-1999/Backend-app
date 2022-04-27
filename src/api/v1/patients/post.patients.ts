import { Request, Response} from "express";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patient_model";
import { DiagnoseModel } from "../../../db/models/diagnose_model";

const fs = require('fs');



export const workflow = async (req: Request, res: Response) => {


  const {body} = req

  try {

    const diagnose: DiagnoseModel = await models.Diagnose.findOne({where: {id: body.diagnoseID}})

    if(!diagnose){
      return res.status(404).json({
        "messages": [
          {
            "details": `Diagnose: ${body.diagnoseID} was not found`,
            "type": "NOT FOUND"
          }
        ]
      })
    }

    const patient = await models.Patient.create(body);

    if (patient) {
      return res.status(200).json({
        "messages": [
          {
            "message": "New patient was added",
            "type": "SUCCESS"
          }
        ],
        "patient": {
          "id": patient.id
        }
      })

    }
  }catch (e){
    return res.status(400).json({
      "messages": [
        {
          "details": e.errors,
          "type": "FAIL"
        }
      ]
    })
  }


}