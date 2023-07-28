import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume08Component} from './resume08.component'

describe('Resume08Component', () => {
	let component: Resume08Component
	let fixture: ComponentFixture<Resume08Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume08Component],
		})
		fixture = TestBed.createComponent(Resume08Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
