import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Education01Component} from './education01.component'

describe('Education01Component', () => {
	let component: Education01Component
	let fixture: ComponentFixture<Education01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Education01Component],
		})
		fixture = TestBed.createComponent(Education01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
