import { Request, Response} from "express";
import { models } from "../../../db";

const fs = require('fs');



export const workflow = async (req: Request, res: Response) => {
  /*
  * Add a new patient with automatically generated id
  * res: 200 if everything is ok
  * res: 204 if there is no such patient for updating
  * */
  try {
    const patient = await models.Patient.create(req.body);

    if (patient) {
      res.json({
        "status": 200,
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
    res.json({
      "status": 204,
      "messages": [
        {
          "details": e.errors,
          "type": "FAIL"
        }
      ]
    })
  }


}