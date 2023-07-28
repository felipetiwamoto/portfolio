import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPage06Component} from './landing-page06.component'

describe('LandingPage06Component', () => {
	let component: LandingPage06Component
	let fixture: ComponentFixture<LandingPage06Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage06Component],
		})
		fixture = TestBed.createComponent(LandingPage06Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
