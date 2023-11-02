import { injectable } from "inversify";
import { Project } from "../data/projects.schema";
import { IProject } from "../types/project.model";

@injectable()
export class ProjectService {

    public async create(project: IProject): Promise<string> {
        const model = new Project();
        model.name = project.name;
        model.logo = project.logo;
        model.founders = project.founders;
        model.pictureUrls = project.pictureUrls;
        model.shortDescription = project.shortDescription;
        model.fundsRaised = project.fundsRaised;
        model.yearFounded = project.yearFounded;
        model.country = project.country;
        model.city = project.city;
        model.websiteUrl = project.websiteUrl;
        model.cohortNum = project.cohortNum;
        model.contact = project.contact;
        model.aboutTheTeam = project.aboutTheTeam;
        model.longDescription = project.longDescription;
        model.milestones = project.milestones;
        model.kpi = project.kpi;
        model.videoUrl = project.videoUrl;
        model.pitchDeckUrl = project.pitchDeckUrl;
        model.impactCategories = project.impactCategories;

        await model.save();
        return model.id;

    }

    public async getById(id: string): Promise<IProject> {
        const p = await Project.findById(id);
        return p as IProject;
    }

}