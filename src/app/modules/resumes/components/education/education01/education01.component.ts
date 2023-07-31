import {Component, Input} from '@angular/core'
import {Education} from '../../../interfaces/education.interface'

@Component({
	selector: 're-education01',
	templateUrl: './education01.component.html',
	styleUrls: ['./education01.component.scss'],
})
export class Education01Component {
	@Input() education?: Education
}
