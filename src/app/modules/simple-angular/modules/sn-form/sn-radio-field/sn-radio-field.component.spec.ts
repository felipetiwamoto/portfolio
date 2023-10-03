import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnRadioFieldComponent} from './sn-radio-field.component'

describe('SnRadioFieldComponent', () => {
	let component: SnRadioFieldComponent
	let fixture: ComponentFixture<SnRadioFieldComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnRadioFieldComponent],
		})
		fixture = TestBed.createComponent(SnRadioFieldComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
