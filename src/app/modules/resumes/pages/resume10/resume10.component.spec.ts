import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume10Component} from './resume10.component'

describe('Resume10Component', () => {
	let component: Resume10Component
	let fixture: ComponentFixture<Resume10Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume10Component],
		})
		fixture = TestBed.createComponent(Resume10Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
