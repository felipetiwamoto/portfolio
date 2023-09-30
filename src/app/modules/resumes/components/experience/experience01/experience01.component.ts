import {Component, Input} from '@angular/core'
import {Experience} from '../../../interfaces/experience.interface'

@Component({
	selector: 're-experience01',
	templateUrl: './experience01.component.html',
	styleUrls: ['./experience01.component.scss'],
})
export class Experience01Component {
	@Input() experience?: Experience
	@Input() language: 'pt-br' | 'en-us' = 'pt-br'
	@Input() texts: any = {
		'pt-br': {listTitle: {tasks: 'Tarefas'}},
		'en-us': {listTitle: {tasks: 'Tasks'}},
	}

	get periodFrom(): string {
		if (!this.experience?.period?.from) return ''
		return this.experience.period.from
	}

	get periodTo(): string {
		if (!this.experience?.period?.to) return ''
		return this.experience.period.to
	}

	get periodIsCurrent(): string {
		if (!this.experience?.period?.isCurrent) return ''
		return this.experience.period.isCurrent ? 'Atual' : ''
	}
}
