import { Router } from "express";
import {
  ProejctController,
} from "../controllers";

export class ProjectsRouter {
  private readonly _router: Router;


  constructor(
    private projectController: ProejctController,
  ) {
    this._router = Router({ strict: true });
    this.init();
  }

  private init(): void {
    // GET

    /**
     * @swagger
     * /api/projects:
     *   get:
     *     description: Gets a project
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.get("/:id", this.projectController.getById);

  }

  public get router(): Router {
    return this._router;
  }
}
