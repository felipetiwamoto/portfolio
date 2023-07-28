import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume04Component} from './resume04.component'

describe('Resume04Component', () => {
	let component: Resume04Component
	let fixture: ComponentFixture<Resume04Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume04Component],
		})
		fixture = TestBed.createComponent(Resume04Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
