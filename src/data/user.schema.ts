import { Schema, model, connect } from 'mongoose';
import { IUser } from '../models/user.model';

export const userSchema = new Schema<IUser>({
   
  address: { type: String, required: true },
  email:  { type: String, required: false },
  nonce: { type: String, required: true }, 
  upvotesAllowed: { type: Number, default: 10, required: true }, 

});

export const User = model<IUser>('User', userSchema);
