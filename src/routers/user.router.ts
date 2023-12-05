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

    this._router.get("/nonce/:address", this.userController.getUserNonce);

    this._router.post("/getToken", this.userController.getToken);

    this._router.get(
      "/me",
      passport.authenticate("jwt", { session: false }),
      this.userController.getUser
    );

    this._router.get(
      "/upvotes",
      passport.authenticate("jwt", { session: false }),
      this.userController.getUpvotes
    )
  }

  public get router(): Router {
    return this._router;
  }
}
