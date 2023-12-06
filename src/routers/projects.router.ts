import { Router } from "express";
import {
  ProejctController,
} from "../controllers";
import { injectable } from "inversify";
import "../passport/passport.config";
import passport from "passport";
@injectable()
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
     *     description: Gets all projects
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.get("/", this.projectController.getAll);

    /**
     * @swagger
     * /api/projects/{id}:
     *   get:
     *     description: Gets a project
     *     parameters:
     *      - in: path
     *        name: id
     *        type: string
     *        required: true
     *        description: Numeric ID of the user to get.
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.get("/:id", this.projectController.getById);


    /**
     * @swagger
     * /api/projects:
     *   post:
     *     description: Create a project
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.post("/", this.projectController.post);

    this._router.post(
      '/:id/upvote',
      passport.authenticate("jwt", { session: false }),
      this.projectController.upvote
    );

  }

  public get router(): Router {
    return this._router;
  }
}
