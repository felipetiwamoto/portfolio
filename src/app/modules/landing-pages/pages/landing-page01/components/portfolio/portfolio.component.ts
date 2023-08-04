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
			image: `Brand Design`,
			category: `Brand Design`,
			title: `Mang Oleh - Brand Identity`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
		{
			image: ``,
			category: `Development`,
			title: `Taste, a Like you Become an Iron Man`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
		{
			image: ``,
			category: `UI/UX`,
			title: `Odading is The Best Food from Mang Oleh`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
		{
			image: ``,
			category: `Motion graphic`,
			title: `Where is the belt? dont Not bring it sis`,
			text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in cididunt ut labore et dolore.`,
		},
	]
}
