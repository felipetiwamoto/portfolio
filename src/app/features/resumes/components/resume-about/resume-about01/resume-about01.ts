import { Component, input } from '@angular/core';
import { Resume } from '../../../interfaces/resume';

@Component({
	selector: 'resume-about01',
	imports: [],
	templateUrl: './resume-about01.html',
	styleUrl: './resume-about01.scss',
})
export class ResumeAbout01 {
	public about = input<Resume['about']>();
}
