import { Component, input } from '@angular/core';
import { Resume } from '../../../interfaces/resume.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
	selector: 'resume-experiences01',
	imports: [LucideAngularModule],
	templateUrl: './resume-experiences01.html',
	styleUrl: './resume-experiences01.scss',
})
export class ResumeExperiences01 {
	public experiences = input<Resume['experiences']>();
}
