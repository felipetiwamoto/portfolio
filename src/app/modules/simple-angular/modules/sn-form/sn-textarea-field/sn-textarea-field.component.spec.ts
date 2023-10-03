import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextareaFieldComponent} from './sn-textarea-field.component'

describe('SnTextareaFieldComponent', () => {
	let component: SnTextareaFieldComponent
	let fixture: ComponentFixture<SnTextareaFieldComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextareaFieldComponent],
		})
		fixture = TestBed.createComponent(SnTextareaFieldComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
