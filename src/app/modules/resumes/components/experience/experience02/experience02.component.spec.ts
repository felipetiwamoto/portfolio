import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Experience02Component} from './experience02.component'

describe('Experience02Component', () => {
	let component: Experience02Component
	let fixture: ComponentFixture<Experience02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Experience02Component],
		})
		fixture = TestBed.createComponent(Experience02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
