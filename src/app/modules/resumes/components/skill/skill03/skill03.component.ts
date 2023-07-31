import {Component, Input} from '@angular/core'
import {Skill} from '../../../interfaces/skill.interface'

@Component({
	selector: 're-skill03',
	templateUrl: './skill03.component.html',
	styleUrls: ['./skill03.component.scss'],
})
export class Skill03Component {
	@Input() skill?: Skill
}
