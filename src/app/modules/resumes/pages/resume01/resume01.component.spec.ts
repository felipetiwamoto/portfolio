import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume01Component} from './resume01.component'

describe('Resume01Component', () => {
	let component: Resume01Component
	let fixture: ComponentFixture<Resume01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume01Component],
		})
		fixture = TestBed.createComponent(Resume01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
