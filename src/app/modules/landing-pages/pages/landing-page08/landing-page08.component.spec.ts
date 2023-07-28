import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage08Component} from './landing-page08.component'

describe('LandingPage08Component', () => {
	let component: LandingPage08Component
	let fixture: ComponentFixture<LandingPage08Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage08Component],
		})
		fixture = TestBed.createComponent(LandingPage08Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
