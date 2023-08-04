import {Component} from '@angular/core'
import {Person} from '../../interfaces/person.interface'

@Component({
	selector: 'lp01-our-team',
	templateUrl: './our-team.component.html',
	styleUrls: ['./our-team.component.scss'],
})
export class OurTeamComponent {
	public persons: Person[] = []
}
