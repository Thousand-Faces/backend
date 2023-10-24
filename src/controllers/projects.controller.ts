import { Response } from "express";


export class ProejctController {
  constructor() {}

  public getById = async (req: any, res: Response) => {
    try {
      const id = req.params.id;

      return res.status(200).send({});
    } catch (err) {
      return res
        .status(500)
        .send({ error: "Something went wrong, please try again later." });
    }
  };
}
