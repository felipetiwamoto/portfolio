import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCarouselComponent} from './sn-carousel.component'

describe('SnCarouselComponent', () => {
	let component: SnCarouselComponent
	let fixture: ComponentFixture<SnCarouselComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCarouselComponent],
		})
		fixture = TestBed.createComponent(SnCarouselComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
