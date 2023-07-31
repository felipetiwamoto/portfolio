import {Component, Input} from '@angular/core'
import {Contact} from '../../../interfaces/contact.interface'

@Component({
	selector: 're-contact01',
	templateUrl: './contact01.component.html',
	styleUrls: ['./contact01.component.scss'],
})
export class Contact01Component {
	@Input() contact?: Contact
}
