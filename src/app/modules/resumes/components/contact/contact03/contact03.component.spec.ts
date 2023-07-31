import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Contact03Component} from './contact03.component'

describe('Contact03Component', () => {
	let component: Contact03Component
	let fixture: ComponentFixture<Contact03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Contact03Component],
		})
		fixture = TestBed.createComponent(Contact03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
