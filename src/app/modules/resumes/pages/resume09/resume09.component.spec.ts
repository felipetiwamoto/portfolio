import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume09Component} from './resume09.component'

describe('Resume09Component', () => {
	let component: Resume09Component
	let fixture: ComponentFixture<Resume09Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume09Component],
		})
		fixture = TestBed.createComponent(Resume09Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
