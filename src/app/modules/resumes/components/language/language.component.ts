import {Component, Input} from '@angular/core'
import {Language} from '../../interfaces/language.interface'

@Component({
	selector: 're-language',
	templateUrl: './language.component.html',
	styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
	@Input() slug: string = '01'
	@Input() language?: Language
}
