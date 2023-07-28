import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage09Component} from './landing-page09.component'

describe('LandingPage09Component', () => {
	let component: LandingPage09Component
	let fixture: ComponentFixture<LandingPage09Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage09Component],
		})
		fixture = TestBed.createComponent(LandingPage09Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
