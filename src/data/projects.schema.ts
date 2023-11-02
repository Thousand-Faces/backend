import { Schema, model, connect } from 'mongoose';
import { IProject } from '../types/project.model';

export const projectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fundsRaised: { type: Number, required: true },
    yearFounded: { type: Number, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    cohortNum: { type: Number, required: false },
    aboutTheTeam: { type: String, required: false },
    longDescription: { type: String, required: false },
    milestones: { type: String, required: false },
    kpi: { type: String, required: true },
    videoUrl: { type: String, required: false },
    pitchDeckUrl: { type: String, required: false },
    founders: { type: Schema.Types.Mixed },
    pictureUrls: { type: Schema.Types.Mixed },
    impactCategories: { type: Schema.Types.Mixed },
    contact: { type: Schema.Types.Mixed },

});

export const Project = model<IProject>('Project', projectSchema);

