import {Component} from '@angular/core'
import {Service} from '../../interfaces/service.interface'

@Component({
	selector: 'lp01-our-services',
	templateUrl: './our-services.component.html',
	styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent {
	public services: Service[] = [
		{
			icon: 'ft_help_circle',
			title: 'IT Consultancy',
			text: 'Create 2d / 3d video animation in<br /> a short period of time designed<br /> to promote a company product',
		},
		{
			icon: 'ft_edit_2',
			title: 'UI/UX Design',
			text: 'Make the appearance of a mobile<br /> application that has quality and<br /> increases user convenience',
		},
		{
			icon: 'ft_user_check',
			title: 'QA Testing',
			text: 'Change the appearance of a<br /> design into code that will be<br /> made into an amazing website',
		},
		{
			icon: 'ft_shield',
			title: 'Database Security',
			text: 'Create customizable illustrations<br /> with attractive designs that are<br /> made visually through high<br /> creativity',
		},
	]
}
