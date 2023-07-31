import {Component, Input} from '@angular/core'
import {Contact} from '../../interfaces/contact.interface'

@Component({
	selector: 're-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
	@Input() slug: string = '01'
	@Input() contact?: Contact
}
