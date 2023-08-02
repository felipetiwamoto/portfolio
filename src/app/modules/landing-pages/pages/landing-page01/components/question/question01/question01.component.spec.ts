import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Question01Component} from './question01.component'

describe('Question01Component', () => {
	let component: Question01Component
	let fixture: ComponentFixture<Question01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Question01Component],
		})
		fixture = TestBed.createComponent(Question01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
