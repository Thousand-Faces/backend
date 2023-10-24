
export interface IProject {
    name: string;
    logo: string;
    founders: IFounder[];
    pictureUrls: string[];
    shortDescription: string;
    fundsRaised: number;
    yearFounded: number;
    country: string;
    city: string;
    websiteUrl: string;
    cohortNum: number;
    contact: IContact;
    aboutTheTeam: string;
    longDescription: string;
    milestones: string;
    kpi: string; // ?
    videoUrl: string;
    pitchDeckUrl: string;
    impactCategories: string[];
}

export interface IFounder {
    firstName: string;
    lastName: string;
    bio: string;
}

export interface IContact {
    email: string;
    phoneNumber: string;
    name: string;
    notes: string;
    address: string;
}