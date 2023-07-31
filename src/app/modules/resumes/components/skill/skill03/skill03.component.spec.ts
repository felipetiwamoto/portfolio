import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Skill03Component} from './skill03.component'

describe('Skill03Component', () => {
	let component: Skill03Component
	let fixture: ComponentFixture<Skill03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Skill03Component],
		})
		fixture = TestBed.createComponent(Skill03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
