import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnRadioField02Component} from './sn-radio-field02.component'

describe('SnRadioField02Component', () => {
	let component: SnRadioField02Component
	let fixture: ComponentFixture<SnRadioField02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnRadioField02Component],
		})
		fixture = TestBed.createComponent(SnRadioField02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
