import { Request, Response} from "express";
const fs = require('fs');
import { models } from "../../../db";



export const workflow = (req: Request, res: Response) => {

  let patients: [{
    id: number
  }] = JSON.parse(fs.readFileSync('./src/api/v1/patients/patients.json'))

  const patientID: number = parseInt(req.params.patientID)
  try{
    models.Patient.destroy({where: {id: patientID}})
    res.json({
      "status": 200,
      "messages": [
        {
          "message": `Patient ${patientID} was deleted`,
          "type": "SUCCESS"
        }
      ]
    })
  }catch (e){
    res.json({
      "status": 204,
      "messages": [
        {
          "details": e.errors,
          "type": "NO CONTENT"
        }
      ]
    })
  }



}