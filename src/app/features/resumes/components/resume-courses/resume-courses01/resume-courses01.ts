import { Component, input } from '@angular/core';
import { Resume } from '../../../interfaces/resume.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
	selector: 'resume-courses01',
	imports: [LucideAngularModule],
	templateUrl: './resume-courses01.html',
	styleUrl: './resume-courses01.scss',
})
export class ResumeCourses01 {
	public courses = input<Resume['courses']>();
}
