import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCheckboxField02Component} from './sn-checkbox-field02.component'

describe('SnCheckboxField02Component', () => {
	let component: SnCheckboxField02Component
	let fixture: ComponentFixture<SnCheckboxField02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCheckboxField02Component],
		})
		fixture = TestBed.createComponent(SnCheckboxField02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
