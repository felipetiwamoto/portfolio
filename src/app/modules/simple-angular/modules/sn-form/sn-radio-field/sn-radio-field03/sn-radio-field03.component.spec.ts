import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnRadioField03Component} from './sn-radio-field03.component'

describe('SnRadioField03Component', () => {
	let component: SnRadioField03Component
	let fixture: ComponentFixture<SnRadioField03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnRadioField03Component],
		})
		fixture = TestBed.createComponent(SnRadioField03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
