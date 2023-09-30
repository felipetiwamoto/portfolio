import {Component, Input} from '@angular/core'
import {Experience} from '../../../interfaces/experience.interface'

@Component({
	selector: 're-experience02',
	templateUrl: './experience02.component.html',
	styleUrls: ['./experience02.component.scss'],
})
export class Experience02Component {
	@Input() experience?: Experience
	@Input() language: 'pt-br' | 'en-us' = 'pt-br'
}
