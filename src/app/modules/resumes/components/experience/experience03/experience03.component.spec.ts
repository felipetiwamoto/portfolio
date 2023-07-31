import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Experience03Component} from './experience03.component'

describe('Experience03Component', () => {
	let component: Experience03Component
	let fixture: ComponentFixture<Experience03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Experience03Component],
		})
		fixture = TestBed.createComponent(Experience03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
