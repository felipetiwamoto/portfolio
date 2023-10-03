import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCheckboxField03Component} from './sn-checkbox-field03.component'

describe('SnCheckboxField03Component', () => {
	let component: SnCheckboxField03Component
	let fixture: ComponentFixture<SnCheckboxField03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCheckboxField03Component],
		})
		fixture = TestBed.createComponent(SnCheckboxField03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
