import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextFieldComponent} from './sn-text-field.component'

describe('SnTextFieldComponent', () => {
	let component: SnTextFieldComponent
	let fixture: ComponentFixture<SnTextFieldComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextFieldComponent],
		})
		fixture = TestBed.createComponent(SnTextFieldComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
