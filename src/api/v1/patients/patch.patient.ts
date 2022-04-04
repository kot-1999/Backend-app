import { Request, Response} from "express";
const fs = require('fs');

export const workflow = (req: Request, res: Response) => {
  /*
  * Updates existing patient
  * res: 200 if everything is ok
  * res: 204 if there is no such patient for updating
  * */
  let patients: [any] = JSON.parse(fs.readFileSync('./src/api/v1/patients/patients.json'))

  const patientID: number = parseInt(req.params.patientID)

  for(let i:number = 0; i < patients.length; i++){
    if(patientID == patients[i].id){

      for (let key in req.body) {
        patients[i][key] = req.body[key];
      }

      fs.writeFileSync('./src/api/v1/patients/patients.json', JSON.stringify(patients))
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
      return
    }
  }

  res.json({
    "status": 204,
    "messages": [
      {
        "message": `Patient: ${patientID} was not found`,
        "type": "NO CONTENT"
      }
    ],
    "patient": {
      "id": patientID
    }
  })
}