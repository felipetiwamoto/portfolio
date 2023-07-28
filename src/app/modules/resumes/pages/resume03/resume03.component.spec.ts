import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume03Component} from './resume03.component'

describe('Resume03Component', () => {
	let component: Resume03Component
	let fixture: ComponentFixture<Resume03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume03Component],
		})
		fixture = TestBed.createComponent(Resume03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
