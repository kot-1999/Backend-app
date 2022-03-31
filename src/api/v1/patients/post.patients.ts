import { Request, Response} from "express";
const fs = require('fs');



export const workflow = (req: Request, res: Response) => {
  /*
  * Add a new patient with automatically generated id
  * res: 200 if everything is ok
  * res: 204 if there is no such patient for updating
  * */

  let patients: [{
    id: number
  }] = JSON.parse(fs.readFileSync('./src/api/v1/patients/patients.json'))


  req.body.id = patients[patients.length-1].id + 1;
  patients.push(req.body)
  fs.writeFileSync('./src/api/v1/patients/patients.json', JSON.stringify(patients))


  res.json({
    "status": 200,
    "messages": [
      {
        "message": "New patient was added",
        "type": "SUCCESS"
      }
    ],
    "patient": {
      "id": req.body.id
    }
  })
}