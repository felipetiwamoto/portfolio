import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Project02Component} from './project02.component'

describe('Project02Component', () => {
	let component: Project02Component
	let fixture: ComponentFixture<Project02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Project02Component],
		})
		fixture = TestBed.createComponent(Project02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
