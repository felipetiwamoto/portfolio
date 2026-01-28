import { Component, input } from '@angular/core';
import { Resume } from '../../../interfaces/resume';
import { LucideAngularModule } from 'lucide-angular';

@Component({
	selector: 'resume-contacts01',
	imports: [LucideAngularModule],
	templateUrl: './resume-contacts01.html',
	styleUrl: './resume-contacts01.scss',
})
export class ResumeContacts01 {
	public localize = $localize;
	public contacts = input<Resume['contact']>();
}
