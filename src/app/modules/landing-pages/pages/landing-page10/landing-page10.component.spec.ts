import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage10Component} from './landing-page10.component'

describe('LandingPage10Component', () => {
	let component: LandingPage10Component
	let fixture: ComponentFixture<LandingPage10Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage10Component],
		})
		fixture = TestBed.createComponent(LandingPage10Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
