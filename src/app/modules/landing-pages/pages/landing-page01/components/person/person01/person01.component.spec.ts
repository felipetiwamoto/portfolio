import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Person01Component} from './person01.component'

describe('Person01Component', () => {
	let component: Person01Component
	let fixture: ComponentFixture<Person01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Person01Component],
		})
		fixture = TestBed.createComponent(Person01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
