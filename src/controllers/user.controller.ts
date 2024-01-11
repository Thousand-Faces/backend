import { Response } from "express";
import { ProjectService } from "../services/projects.service";
import { injectable } from "inversify";
import { verifyMessage } from "@ethersproject/wallet";
import jwt from "jsonwebtoken";

import { User } from "../data/user.schema";
const generateNewNonce = () => {
  return `${Math.floor(Math.random() * 1000000).toString()}`;
};

@injectable()
export class UserController {
  private projects: ProjectService
  constructor(private p: ProjectService) {
    this.projects = p;
  }

  public getUser = async (req: any, res: any) => {
    try {
      const response = { address: req.user.address };
      res.status(200).send(response);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  };

  // Get user nonce
  public getUserNonce = async (req: any, res: any) => {
    try {
      const { address } = req.params;
      let user = await User.findOne({ address: address });
      if (user) {
        res.status(200).send({ nonce: user.nonce });
      } else {
        user = new User();
        user.address = address;
        user.nonce = generateNewNonce();
        await user.save();
        res.status(200).send({ nonce: user.nonce });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  };

  // Process signed message
  public getToken = async (req: any, res: any) => {
    const { signature, address } = req.body;
    try {
      const user = await User.findOne({ address: address });
      if (user) {
        const recoveredAddress = await verifyMessage(user.nonce, signature);

        // Check if address matches
        if (recoveredAddress.toLowerCase() === user.address.toLowerCase()) {
          // Change user nonce
          user.nonce = generateNewNonce();
          await user.save();
          // Set jwt token
          const token = jwt.sign(
            {
              _id: user._id,
              address: user.address,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "60 days" }
          );
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: user,
            msg: "You are now logged in.",
          });
        } else {
          // User is not authenticated
          res.status(401).send("Invalid credentials");
        }
      } else {
        res.status(404).send("User does not exist");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  };

  // Process signed message
  public getCurrentUserUpvotes = async (req: any, res: any) => {
    try {
      const address = req.user.address;
      const user = await User.findOne({ address: address });
      if (user) {
        const upvotedProjects = await this.projects.getUpvoted(address);
        res.status(200).send({ projects: upvotedProjects });
      } else {
        // User is not authenticated
        res.status(401).send("Invalid credentials");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  };
  // Process signed message
  public getUpvotes = async (req: any, res: any) => {
    try {
      const address = req.params.address;
      const user = await User.findOne({ address: address });
      if (user) {
        const upvotedProjects = await this.projects.getUpvoted(address);
        res.status(200).send({ projects: upvotedProjects });
      } else {
        // User is not authenticated
        res.status(404).send("User not found.");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  };


  // Process signed message
  public register = async (req: any, res: any) => {
    try {

      const email = req.body.email;
      const address = req.user.address;
      const user = await User.findOne({ address: address });
      if (user) {
        // Change user nonce
        user.email = email;
        await user.save();
        res.status(200).json(user);
      } else {
        // User is not authenticated
        res.status(401).send("Invalid credentials");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  };
}
