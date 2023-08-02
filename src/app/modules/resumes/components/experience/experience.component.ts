import {Component, Input} from '@angular/core'
import {Experience} from '../../interfaces/experience.interface'

@Component({
	selector: 're-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
	@Input() slug: string = '01'
	@Input() experience?: Experience
}
