import {Component, Input} from '@angular/core'
import {Language} from '../../../interfaces/language.interface'

@Component({
	selector: 're-language01',
	templateUrl: './language01.component.html',
	styleUrls: ['./language01.component.scss'],
})
export class Language01Component {
	@Input() language?: Language

	public levels = Array(10).fill(0)

	isBulletItemActive(number: number) {
		if (!this.language?.level) return ''
		return this.language.level >= number ? 'active' : ''
	}
}
