import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LandingPagesComponent} from './landing-pages.component'

describe('LandingPagesComponent', () => {
	let component: LandingPagesComponent
	let fixture: ComponentFixture<LandingPagesComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPagesComponent],
		})
		fixture = TestBed.createComponent(LandingPagesComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
