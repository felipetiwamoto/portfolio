import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCheckboxFieldComponent} from './sn-checkbox-field.component'

describe('SnCheckboxFieldComponent', () => {
	let component: SnCheckboxFieldComponent
	let fixture: ComponentFixture<SnCheckboxFieldComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCheckboxFieldComponent],
		})
		fixture = TestBed.createComponent(SnCheckboxFieldComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
