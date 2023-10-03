import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnRadioField01Component} from './sn-radio-field01.component'

describe('SnRadioField01Component', () => {
	let component: SnRadioField01Component
	let fixture: ComponentFixture<SnRadioField01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnRadioField01Component],
		})
		fixture = TestBed.createComponent(SnRadioField01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
