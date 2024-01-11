import { Router } from "express";
import {
  UserController
} from "../controllers";
import { injectable } from "inversify";
import "../passport/passport.config";
import passport from "passport";

@injectable()
export class UserRouter {
  private readonly _router: Router;


  constructor(
    private userController: UserController,
  ) {
    this._router = Router({ strict: true });
    this.init();
  }

  private init(): void {
    // GET


    /**
     * @swagger
     * /api/user/nonce/{address}:
     *   get:
     *     description: Gets a nonce for user authentication 
     *     parameters:
     *      - in: path
     *        name: address
     *        type: string
     *        required: true
     *        description: The address of the user
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.get("/nonce/:address", this.userController.getUserNonce);


    /**
     * @swagger
     * /api/user/getToken:
     *   post:
     *     description: Creates an authentication token for the user based on the signature 
     *     consumes:
     *      - application/json
     *     parameters:
     *      - in: body
     *        name: authData
     *        schema:
     *          type: object
     *          required:
     *            - signature
     *            - address
     *          properties:
     *            signature: 
     *              type: string
     *            address: 
     *              type: string
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.post("/token", this.userController.getToken);


    /**
     * @swagger
     * /api/user/me:
     *   get:
     *     description: Gets the currently logged in user 
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.get(
      "/me",
      passport.authenticate("jwt", { session: false }),
      this.userController.getUser
    );


    /**
     * @swagger
     * /api/user/me/upvotes:
     *   get:
     *     description: Gets all projects upvoted by the currently logged in user
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.get(
      "/me/upvotes",
      passport.authenticate("jwt", { session: false }),
      this.userController.getCurrentUserUpvotes
    )


    /**
     * @swagger
     * /api/user/register:
     *   post:
     *     description: Creates or edits new user address <-> email 
     *     consumes:
     *      - application/json
     *     parameters:
     *      - in: body
     *        name: authData
     *        schema:
     *          type: object
     *          required:
     *            - email
     *            - address
     *          properties:
     *            email: 
     *              type: string
     *            address: 
     *              type: string
     *     responses:
     *       200:
     *         description: Success
     *       500:
     *         description: Something went wrong, please try again later.
     */
    this._router.post("/data", this.userController.register);

  }

  public get router(): Router {
    return this._router;
  }
}
