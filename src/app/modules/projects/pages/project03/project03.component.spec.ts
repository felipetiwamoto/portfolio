import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Project03Component} from './project03.component'

describe('Project03Component', () => {
	let component: Project03Component
	let fixture: ComponentFixture<Project03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Project03Component],
		})
		fixture = TestBed.createComponent(Project03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
