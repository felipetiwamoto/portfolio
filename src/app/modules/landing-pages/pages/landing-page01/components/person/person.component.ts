import {Component, Input} from '@angular/core'
import {Person} from '../../interfaces/person.interface'

@Component({
	selector: 'lp01-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
	@Input() person?: Person
}
