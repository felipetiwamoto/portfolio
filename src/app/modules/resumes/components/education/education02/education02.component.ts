import {Component, Input} from '@angular/core'
import {Education} from '../../../interfaces/education.interface'

@Component({
	selector: 're-education02',
	templateUrl: './education02.component.html',
	styleUrls: ['./education02.component.scss'],
})
export class Education02Component {
	@Input() education?: Education
}
