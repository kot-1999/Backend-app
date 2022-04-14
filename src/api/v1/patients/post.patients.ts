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
      return res.json({
        "status": 404,
        "messages": [
          {
            "details": `Diagnose: ${body.diagnoseID} was not found`,
            "type": "NOT FOUND"
          }
        ]
      })
    }

    const patient = await models.Patient.create(req.body);

    if (patient) {
      return res.json({
        "status": 200,
        "messages": [
          {
            "message": "New v1 was added",
            "type": "SUCCESS"
          }
        ],
        "patient": {
          "id": patient.id
        }
      })

    }
  }catch (e){
    return res.json({
      "status": 400,
      "messages": [
        {
          "details": e.errors,
          "type": "FAIL"
        }
      ]
    })
  }


}