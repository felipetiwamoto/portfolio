import {Component, Input} from '@angular/core'
import {Education} from '../../interfaces/education.interface'

@Component({
	selector: 're-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
	@Input() slug: string = '01'
	@Input() education?: Education
}
