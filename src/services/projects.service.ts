import { injectable } from "inversify";
import { Project } from "../data/projects.schema";
import { IProject } from "../types/project.model";

@injectable()
export class ProjectService {

    public async create(project: IProject): Promise<string> {
        const model = new Project();
        model.founderEmail = project.founderEmail;
        model.founderName = project.founderName;
        model.startupName = project.startupName;
        model.shortDescription = project.shortDescription;
        model.founderTitle = project.founderTitle;
        model.linkedIn = project.linkedIn;
        model.country = project.country;
        model.website = project.website;
        model.pitchSentence = project.pitchSentence;
        model.yearFound = project.yearFound;
        model.problemSolving = project.problemSolving;
        model.solution = project.solution;
        model.businessModel = project.businessModel;
        model.impactCategory = project.impactCategory;
        model.businessImpact = project.businessImpact;
        model.marketPotential = project.marketPotential;
        model.differentiation = project.differentiation;
        model.teamRepresentation = project.teamRepresentation;
        model.videoLink = project.videoLink;
        model.fundingStage = project.fundingStage;
        model.raisingAmount = project.raisingAmount;
        model.programApplicationReason = project.programApplicationReason;
        model.milestone = project.milestone;
        model.challenge = project.challenge;
        model.referral = project.referral;
        model.logo = project.logo;
        model.pitchDeck = project.pitchDeck;
        model.additionalInfo = project.additionalInfo;

        await model.save();
        return model.id;

    }

    public async getById(id: string): Promise<IProject> {
        const p = await Project.findById(id);
        return p as IProject;
    }

    public async getAll(): Promise<IProject[]> {
        const p = await Project.find({});
        return p as IProject[];
    }

}