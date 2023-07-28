import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Project04Component} from './project04.component'

describe('Project04Component', () => {
	let component: Project04Component
	let fixture: ComponentFixture<Project04Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Project04Component],
		})
		fixture = TestBed.createComponent(Project04Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
