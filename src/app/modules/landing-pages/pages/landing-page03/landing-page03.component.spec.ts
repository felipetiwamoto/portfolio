import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage03Component} from './landing-page03.component'

describe('LandingPage03Component', () => {
	let component: LandingPage03Component
	let fixture: ComponentFixture<LandingPage03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage03Component],
		})
		fixture = TestBed.createComponent(LandingPage03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
