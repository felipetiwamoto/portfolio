import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage07Component} from './landing-page07.component'

describe('LandingPage07Component', () => {
	let component: LandingPage07Component
	let fixture: ComponentFixture<LandingPage07Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage07Component],
		})
		fixture = TestBed.createComponent(LandingPage07Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
