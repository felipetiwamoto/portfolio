import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Skill01Component} from './skill01.component'

describe('Skill01Component', () => {
	let component: Skill01Component
	let fixture: ComponentFixture<Skill01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Skill01Component],
		})
		fixture = TestBed.createComponent(Skill01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
