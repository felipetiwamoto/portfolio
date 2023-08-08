import {Component} from '@angular/core'
import {Project} from '../../interfaces/project.interface'

@Component({
	selector: 'lp01-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
	public projects?: Project[] = [
		{
			image: `assets/images/landing-pages/landing-page01/landing_page01_portfolio01.jpg`,
			category: `Brand Design`,
			title: `Mang Oleh - Brand Identity`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
		{
			image: `assets/images/landing-pages/landing-page01/landing_page01_portfolio02.jpg`,
			category: `Development`,
			title: `Taste, a Like you Become an Iron Man`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
		{
			image: `assets/images/landing-pages/landing-page01/landing_page01_portfolio03.jpg`,
			category: `UI/UX`,
			title: `Odading is The Best Food from Mang Oleh`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
		{
			image: `assets/images/landing-pages/landing-page01/landing_page01_portfolio04.jpg`,
			category: `Motion graphic`,
			title: `Where is the belt? dont Not bring it sis`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
	]
}
