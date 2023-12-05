import { Schema, model, connect } from 'mongoose';
import { IUpvote } from '../models/upvote.model';

export const upvoteSchema = new Schema<IUpvote>({
   
  userAddress: { type: String, required: true },
  upvotedProjectId: { type: String, required: true }, 

});

export const Upvote = model<IUpvote>('Upvote', upvoteSchema);
