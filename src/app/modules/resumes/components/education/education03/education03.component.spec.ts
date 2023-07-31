import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Education03Component} from './education03.component'

describe('Education03Component', () => {
	let component: Education03Component
	let fixture: ComponentFixture<Education03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Education03Component],
		})
		fixture = TestBed.createComponent(Education03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
