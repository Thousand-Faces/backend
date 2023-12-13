import { Schema, model, connect } from 'mongoose';
import { IProject } from '../models/project.model';

export const projectSchema = new Schema<IProject>({
    founderEmail: { type: String, required: true },
    founderName: { type: String, required: true },
    startupName: { type: String, required: true },
    founderTitle: { type: String, required: true },
    linkedIn: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, required: true },
    pitchSentence: { type: String, required: true },
    yearFound: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    businessModel: { type: String, required: true },
    impactCategory: { type: String, required: true },
    marketPotential: { type: String, required: true },
    differentiation: { type: String, required: true },
    teamRepresentation: { type: Schema.Types.Mixed, required: true },
    videoLink: { type: String, required: true },
    fundingStage: { type: String, required: true },
    raisingAmount: { type: Number, required: true },
    programApplicationReason: { type: String, required: true },
    milestone: { type: String, required: true },
    challenge: { type: String, required: true },
    logo: { type: String, required: false },
    pitchDeck: { type: String, required: true },
    additionalInfo: { type: String, required: false },
    isRaising: { type: Boolean },
    teamReason: { type: String, required: true },
    source: { type: String, required: true },

});

export const Project = model<IProject>('Project', projectSchema);

