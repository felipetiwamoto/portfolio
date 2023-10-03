import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCheckboxField01Component} from './sn-checkbox-field01.component'

describe('SnCheckboxField01Component', () => {
	let component: SnCheckboxField01Component
	let fixture: ComponentFixture<SnCheckboxField01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCheckboxField01Component],
		})
		fixture = TestBed.createComponent(SnCheckboxField01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
