import {Component, Input} from '@angular/core'
import {Skill} from '../../../interfaces/skill.interface'

@Component({
	selector: 're-skill02',
	templateUrl: './skill02.component.html',
	styleUrls: ['./skill02.component.scss'],
})
export class Skill02Component {
	@Input() skill?: Skill
}
