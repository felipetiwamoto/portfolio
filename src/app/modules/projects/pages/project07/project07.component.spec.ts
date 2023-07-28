import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Project07Component} from './project07.component'

describe('Project07Component', () => {
	let component: Project07Component
	let fixture: ComponentFixture<Project07Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Project07Component],
		})
		fixture = TestBed.createComponent(Project07Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
