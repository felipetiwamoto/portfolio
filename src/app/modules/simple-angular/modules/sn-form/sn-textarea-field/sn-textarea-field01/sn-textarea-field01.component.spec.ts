import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextareaField01Component} from './sn-textarea-field01.component'

describe('SnTextareaField01Component', () => {
	let component: SnTextareaField01Component
	let fixture: ComponentFixture<SnTextareaField01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextareaField01Component],
		})
		fixture = TestBed.createComponent(SnTextareaField01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
