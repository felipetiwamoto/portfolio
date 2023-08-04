import {Component, Input} from '@angular/core'
import {Service} from '../../interfaces/service.interface'

@Component({
	selector: 'lp01-service',
	templateUrl: './service.component.html',
	styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
	@Input() service?: Service
}
