import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage05Component} from './landing-page05.component'

describe('LandingPage05Component', () => {
	let component: LandingPage05Component
	let fixture: ComponentFixture<LandingPage05Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage05Component],
		})
		fixture = TestBed.createComponent(LandingPage05Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
