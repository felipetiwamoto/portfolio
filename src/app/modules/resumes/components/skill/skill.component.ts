import {Component, Input} from '@angular/core'
import {Skill} from '../../interfaces/skill.interface'

@Component({
	selector: 're-skill',
	templateUrl: './skill.component.html',
	styleUrls: ['./skill.component.scss'],
})
export class SkillComponent {
	@Input() slug: string = '01'
	@Input() skill?: Skill
}
