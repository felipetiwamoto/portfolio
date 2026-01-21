import { Component, input } from '@angular/core';
import { Resume } from '../../../interfaces/resume.interface';

@Component({
	selector: 'resume-hero01',
	imports: [],
	templateUrl: './resume-hero01.html',
	styleUrl: './resume-hero01.scss',
})
export class ResumeHero01 {
	public hero = input<Resume['hero']>();
}
