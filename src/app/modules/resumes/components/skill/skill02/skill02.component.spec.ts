import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Skill02Component} from './skill02.component'

describe('Skill02Component', () => {
	let component: Skill02Component
	let fixture: ComponentFixture<Skill02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Skill02Component],
		})
		fixture = TestBed.createComponent(Skill02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
