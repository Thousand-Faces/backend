import { Response } from "express";
import { ProjectService } from "../services/projects.service";
import { injectable } from "inversify";

@injectable()
export class ProejctController {
  private projects: ProjectService
  constructor(private p: ProjectService) {
    this.projects = p;
  }

  public getById = async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      const project = await this.projects.getById(id);
      if(!project)
        return res.status(404).send();
      return res.status(200).send({ project });
    } catch (err) {
      return res
        .status(500)
        .send({ error: "Something went wrong, please try again later." });
    }
  };


  public post = async (req: any, res: Response) => {
    try {
      const project = req.body;
      const projectId = await this.projects.create(project);
      return res.status(201).send({ projectId });
    } catch (err) {
      return res
        .status(500)
        .send({ error: "Something went wrong, please try again later." });
    }
  };
}
