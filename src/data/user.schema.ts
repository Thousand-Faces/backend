import { Schema, model, connect } from 'mongoose';
import { IUser } from '../models/user.model';

export const userSchema = new Schema<IUser>({
   
  address: { type: String, required: true },
  nonce: { type: String, required: true }, 
  upvotesAllowed: { type: Number, default: 3, required: true }, 

});

export const User = model<IUser>('User', userSchema);
