import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume05Component} from './resume05.component'

describe('Resume05Component', () => {
	let component: Resume05Component
	let fixture: ComponentFixture<Resume05Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume05Component],
		})
		fixture = TestBed.createComponent(Resume05Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
