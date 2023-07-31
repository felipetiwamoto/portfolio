import {Component, Input} from '@angular/core'
import {Language} from '../../../interfaces/language.interface'

@Component({
	selector: 're-language03',
	templateUrl: './language03.component.html',
	styleUrls: ['./language03.component.scss'],
})
export class Language03Component {
	@Input() language?: Language
}
