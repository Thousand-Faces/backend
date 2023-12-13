import { injectable } from "inversify";
import { Project, Upvote, User } from "../data";
import { IProject } from "../models";

@injectable()
export class ProjectService {

    public async create(project: IProject): Promise<string> {
        const model = new Project();
        model.founderEmail = project.founderEmail;
        model.founderName = project.founderName;
        model.startupName = project.startupName;
        model.founderTitle = project.founderTitle;
        model.linkedIn = project.linkedIn;
        model.country = project.country;
        model.website = project.website;
        model.pitchSentence = project.pitchSentence;
        model.yearFound = project.yearFound;
        model.solution = project.solution;
        model.businessModel = project.businessModel;
        model.impactCategory = project.impactCategory;
        model.marketPotential = project.marketPotential;
        model.differentiation = project.differentiation;
        model.teamRepresentation = project.teamRepresentation;
        model.videoLink = project.videoLink;
        model.fundingStage = project.fundingStage;
        model.raisingAmount = project.raisingAmount;
        model.programApplicationReason = project.programApplicationReason;
        model.milestone = project.milestone;
        model.challenge = project.challenge;
        model.logo = project.logo;
        model.pitchDeck = project.pitchDeck;
        model.additionalInfo = project.additionalInfo;
        model.isRaising = project.isRaising;
        model.teamReason = project.teamReason;
        model.source = project.source;

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

    // TODO: implement
    public async getUpvoted(address: string): Promise<IProject[]> {
        const user = await User.findOne({ address: address });
        if (!user) throw Error("User not found");
        const userUpvotes = await Upvote.find({ userAddress: address });
        const projectIds = userUpvotes.map(x => x.upvotedProjectId);
        const projects = await Project.find({ '_id': { $in: projectIds } });
        return projects;
    }

    public async upvoteProject(address: string, projectId: string): Promise<string> {
        const user = await User.findOne({ address: address });
        if (!user) throw Error("User not found");
        const userUpvotes = await Upvote.find({ userAddress: address });
        if (userUpvotes.length >= user?.upvotesAllowed) {
            throw Error("No upvotes left");
        }
        if (userUpvotes.findIndex(x => x.upvotedProjectId == projectId) != -1) {
            throw Error("Already Upvoted");
        }
        const project = await Project.findById(projectId);
        if (!project) throw Error("Invalid Project");
        const upvote = new Upvote();
        upvote.userAddress = address;
        upvote.upvotedProjectId = projectId;
        await upvote.save();
        return upvote.id;

    }

}