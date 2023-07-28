import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Project10Component} from './project10.component'

describe('Project10Component', () => {
	let component: Project10Component
	let fixture: ComponentFixture<Project10Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Project10Component],
		})
		fixture = TestBed.createComponent(Project10Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
