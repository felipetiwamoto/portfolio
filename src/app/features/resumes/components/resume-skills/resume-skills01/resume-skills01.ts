import { Component, input } from '@angular/core';
import { Resume, ResumeSkill } from '../../../interfaces/resume';

@Component({
	selector: 'resume-skills01',
	imports: [],
	templateUrl: './resume-skills01.html',
	styleUrl: './resume-skills01.scss',
})
export class ResumeSkills01 {
	public skills = input<Resume['skills']>();
	public levels = Array(10).fill(0);

	isBulletItemActive(skill: ResumeSkill, number: number) {
		if (!skill?.level) return '';
		return skill.level >= number ? 'active' : '';
	}
}
