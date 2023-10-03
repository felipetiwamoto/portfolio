import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextareaField02Component} from './sn-textarea-field02.component'

describe('SnTextareaField02Component', () => {
	let component: SnTextareaField02Component
	let fixture: ComponentFixture<SnTextareaField02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextareaField02Component],
		})
		fixture = TestBed.createComponent(SnTextareaField02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
