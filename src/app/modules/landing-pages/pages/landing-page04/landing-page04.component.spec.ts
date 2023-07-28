import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage04Component} from './landing-page04.component'

describe('LandingPage04Component', () => {
	let component: LandingPage04Component
	let fixture: ComponentFixture<LandingPage04Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage04Component],
		})
		fixture = TestBed.createComponent(LandingPage04Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
