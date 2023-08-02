import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Experience01Component} from './experience01.component'

describe('Experience01Component', () => {
	let component: Experience01Component
	let fixture: ComponentFixture<Experience01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Experience01Component],
		})
		fixture = TestBed.createComponent(Experience01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
