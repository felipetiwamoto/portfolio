import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume07Component} from './resume07.component'

describe('Resume07Component', () => {
	let component: Resume07Component
	let fixture: ComponentFixture<Resume07Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume07Component],
		})
		fixture = TestBed.createComponent(Resume07Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
