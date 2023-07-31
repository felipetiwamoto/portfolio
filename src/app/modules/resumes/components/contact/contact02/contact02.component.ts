import {Component, Input} from '@angular/core'
import {Contact} from '../../../interfaces/contact.interface'

@Component({
	selector: 're-contact02',
	templateUrl: './contact02.component.html',
	styleUrls: ['./contact02.component.scss'],
})
export class Contact02Component {
	@Input() contact?: Contact
}
