import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCarouselItemComponent} from './sn-carousel-item.component'

describe('SnCarouselItemComponent', () => {
	let component: SnCarouselItemComponent
	let fixture: ComponentFixture<SnCarouselItemComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCarouselItemComponent],
		})
		fixture = TestBed.createComponent(SnCarouselItemComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
