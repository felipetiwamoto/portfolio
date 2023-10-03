import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCarousel01Component} from './sn-carousel01.component'

describe('SnCarousel01Component', () => {
	let component: SnCarousel01Component
	let fixture: ComponentFixture<SnCarousel01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCarousel01Component],
		})
		fixture = TestBed.createComponent(SnCarousel01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
