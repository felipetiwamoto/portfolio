import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume06Component} from './resume06.component'

describe('Resume06Component', () => {
	let component: Resume06Component
	let fixture: ComponentFixture<Resume06Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume06Component],
		})
		fixture = TestBed.createComponent(Resume06Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
