import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage02Component} from './landing-page02.component'

describe('LandingPage02Component', () => {
	let component: LandingPage02Component
	let fixture: ComponentFixture<LandingPage02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage02Component],
		})
		fixture = TestBed.createComponent(LandingPage02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
