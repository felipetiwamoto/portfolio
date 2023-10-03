import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextareaField03Component} from './sn-textarea-field03.component'

describe('SnTextareaField03Component', () => {
	let component: SnTextareaField03Component
	let fixture: ComponentFixture<SnTextareaField03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextareaField03Component],
		})
		fixture = TestBed.createComponent(SnTextareaField03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
