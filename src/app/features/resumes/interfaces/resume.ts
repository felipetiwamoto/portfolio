export interface Resume {
	hero: ResumeHero;
	about: ResumeAbout;
	experiences: ResumeExperience[];
	courses: ResumeCourse[];
	skills: ResumeSkill[];
	contact: ResumeContact[];
}

export interface ResumeHero {
	name: string;
	role: string;
	image?: string;
}

export interface ResumeAbout {
	summary: string;
}

export interface ResumeExperience {
	company: string;
	startedAt: string;
	endedAt?: string;
	responsabilities?: string[];
	softSkills?: string[];
	hardSkills?: string[];
	description?: string;
}

export interface ResumeCourse {
	institution: string;
	name: string;
	timeSpent: string;
}

export interface ResumeSkill {
	name: string;
	level: number;
}

export interface ResumeContact {
	icon: string;
	description: string;
}
