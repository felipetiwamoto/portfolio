import {Component} from '@angular/core'
import {Person} from '../../interfaces/person.interface'

@Component({
	selector: 'lp01-our-team',
	templateUrl: './our-team.component.html',
	styleUrls: ['./our-team.component.scss'],
})
export class OurTeamComponent {
	public persons: Person[] = [
		{
			image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team01.jpg',
			name: 'Tiger Chen',
			job: 'Brand Director',
			text: 'My Responsibility is adapt and maximase your brand strategy for increasing your business.',
			email: 'tigerchen@company.com',
		},
		{
			image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team02.jpg',
			name: 'Andrew Collighman',
			job: 'Brand Marketing',
			text: `I'will take care your brand to engage user and make sure your user have a suitable experience with your brand`,
			email: 'andrewcoll@company.com',
		},
		{
			image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team03.jpg',
			name: 'Li Noor',
			job: 'Logo Designer',
			text: 'Your Brand should be recognized easier by your customer, I’ll help you to design meaningful brand.',
			email: 'linoor@company.com',
		},
		{
			image: 'assets/images/landing-pages/landing-page01/landing_page01_our_team04.jpg',
			name: 'Achmad Yusuf',
			job: 'Senior Graphic Designer',
			text: 'My Responsibility is manage my team to deliver better and meaningful artwork for you.',
			email: 'achyusuf@company.com',
		},
	]
}
