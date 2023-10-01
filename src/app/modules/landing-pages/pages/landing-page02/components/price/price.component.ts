import {AfterViewInit, Component, OnInit} from '@angular/core'

@Component({
	selector: 'lp02-price',
	templateUrl: './price.component.html',
	styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit, AfterViewInit {
	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		;(async () => {
			const planRadios = document.querySelectorAll('.price .price__radio')

			if (planRadios) {
				activePlanTab('plan__basic')

				planRadios.forEach((item) => {
					item.addEventListener('click', () => {
						activePlanTab(item.getAttribute('value'))
					})
				})

				function activePlanTab(dataTabSelector: any) {
					const planTabs = document.querySelectorAll('.price .price__tab__item')

					if (planTabs) {
						planTabs.forEach((item) => item.classList.remove(`price__tab__item--active`))
						const activePlanTab = document.querySelector(
							`.price .price__tab__item[data-tab="${dataTabSelector}"]`
						)
						activePlanTab?.classList.add(`price__tab__item--active`)
					}
				}
			}
		})()
	}
}
