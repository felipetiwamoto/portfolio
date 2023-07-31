import {Component, Input} from '@angular/core'
import {Contact} from '../../../interfaces/contact.interface'

@Component({
	selector: 're-contact03',
	templateUrl: './contact03.component.html',
	styleUrls: ['./contact03.component.scss'],
})
export class Contact03Component {
	@Input() contact?: Contact
}
