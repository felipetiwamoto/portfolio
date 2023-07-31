export interface Experience {
	company?: string
	period?: {from?: string; to?: string; isCurrent?: boolean}
	job?: string
	description?: string
	tasks?: string[]
	softSkills?: string[]
	hardSkills?: string[]
}
