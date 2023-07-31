import {Component, Input} from '@angular/core'
import {Experience} from '../../../interfaces/experience.interface'

@Component({
	selector: 're-experience03',
	templateUrl: './experience03.component.html',
	styleUrls: ['./experience03.component.scss'],
})
export class Experience03Component {
	@Input() experience?: Experience
}
