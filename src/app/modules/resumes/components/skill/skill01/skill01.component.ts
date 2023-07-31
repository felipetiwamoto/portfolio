import {Component, Input} from '@angular/core'
import {Skill} from '../../../interfaces/skill.interface'

@Component({
	selector: 're-skill01',
	templateUrl: './skill01.component.html',
	styleUrls: ['./skill01.component.scss'],
})
export class Skill01Component {
	@Input() skill?: Skill

	public levels = Array(10).fill(0)

	isBulletItemActive(number: number) {
		if (!this.skill?.level) return ''
		return this.skill.level >= number ? 'active' : ''
	}
}
