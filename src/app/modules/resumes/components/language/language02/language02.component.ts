import {Component, Input} from '@angular/core'
import {Language} from '../../../interfaces/language.interface'

@Component({
	selector: 're-language02',
	templateUrl: './language02.component.html',
	styleUrls: ['./language02.component.scss'],
})
export class Language02Component {
	@Input() language?: Language
}
