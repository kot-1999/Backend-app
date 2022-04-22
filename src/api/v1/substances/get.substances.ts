import { Request, Response } from "express";
import { PatientWeight, PersonType, SubstanceAmount } from "../../../enums";


function count_substance_amount(person_type: PersonType, weight: number): number{
  if(person_type === PersonType.ADULT) {
    const res = (SubstanceAmount.MIN * (weight / 10) + 30) / 0.7;
    return (res > SubstanceAmount.ADULT_MAX) ? SubstanceAmount.ADULT_MAX : res;
  }
  else if(person_type === PersonType.CHILD) {
    const res = (SubstanceAmount.MIN * (weight / 10) + 20) * 1.2;
    return (res > SubstanceAmount.CHILDREN_MAX) ? SubstanceAmount.CHILDREN_MAX : res;
  }
}

interface Raw{
  personType: string
  weight: number
  amount: number
  color: string
}

export const  get_substance_amount = async (req: Request, res: Response) => {
  let data: Raw[] = []
  const adultColor: string = 'red';
  const childrenColor: string = 'blue';

  for (let weight = PatientWeight.MIN; weight <= PatientWeight.MAX; weight+=0.1){
    const adult: Raw = {
      personType: PersonType.ADULT,
      weight: weight,
      amount: count_substance_amount(PersonType.ADULT, weight),
      color: adultColor
    }
    const child: Raw = {
      personType: PersonType.CHILD,
      weight: weight,
      amount: count_substance_amount(PersonType.CHILD, weight),
      color: childrenColor
    }

    data.push(adult)
    data.push(child)
  }

  return res.status(200).json(
    {
      data: data
    }
  );
}