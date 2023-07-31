import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Contact02Component} from './contact02.component'

describe('Contact02Component', () => {
	let component: Contact02Component
	let fixture: ComponentFixture<Contact02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Contact02Component],
		})
		fixture = TestBed.createComponent(Contact02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
