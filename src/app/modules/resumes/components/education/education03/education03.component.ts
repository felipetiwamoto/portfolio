import {Component, Input} from '@angular/core'
import {Education} from '../../../interfaces/education.interface'

@Component({
	selector: 're-education03',
	templateUrl: './education03.component.html',
	styleUrls: ['./education03.component.scss'],
})
export class Education03Component {
	@Input() education?: Education
}
