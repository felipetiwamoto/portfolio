import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Contact01Component} from './contact01.component'

describe('Contact01Component', () => {
	let component: Contact01Component
	let fixture: ComponentFixture<Contact01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Contact01Component],
		})
		fixture = TestBed.createComponent(Contact01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
