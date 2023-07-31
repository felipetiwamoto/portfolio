import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Education02Component} from './education02.component'

describe('Education02Component', () => {
	let component: Education02Component
	let fixture: ComponentFixture<Education02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Education02Component],
		})
		fixture = TestBed.createComponent(Education02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
