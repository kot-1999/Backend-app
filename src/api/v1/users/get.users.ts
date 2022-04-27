import { Request, Response } from "express";
import { toNumber, toString } from "lodash";
import { models } from "../../../db";


export const get_all_users = async (req: Request, res: Response) => {
  let options: any = {
    attributes: ['id', 'name', 'role', 'createdAt', 'updatedAt', 'patientID']
  }
  if(req.query.role)
    options.where = { role: req.query.role }
  if(req.query.order)
    options.order = [toString(req.query.order).split(':')]
  if(req.query.limit)
    options.limit = req.query.limit
  if(req.query.page)
    options.offset = (req.query.limit) ? toNumber(req.query.limit) * toNumber(req.query.page) : req.query.page

  const [users] = await Promise.all(
    [models.User.findAll(options)]
  )

  if(users) {
    return res.status(200).json(
      {
        "users": users,
        "count": users.length
      }
    );
  }else{
    return res.status(400).json({
      "messages": [
        {
          "message": `No users were found`,
          "type": "NOT FOUND"
        }
      ]
    })
  }
}


export const get_user_by_id = async (req: Request, res: Response) => {
  const userID: number = parseInt(req.params.userID)

  const user = await
    models.User.findOne({
      attributes: ['id', 'name', 'role', 'createdAt', 'updatedAt', 'patientID'],
      where: {id: userID}
      }
    )



  if(user) {
    return res.status(200).json({
      "user": user
    });

  }
  return res.status(404).json({
    "messages": [
      {
        "message": `User: ${userID} was not found`,
        "type": "NOT FOUND"
      }
    ]
  })


}