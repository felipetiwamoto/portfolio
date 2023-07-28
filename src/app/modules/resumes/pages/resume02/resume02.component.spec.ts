import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Resume02Component} from './resume02.component'

describe('Resume02Component', () => {
	let component: Resume02Component
	let fixture: ComponentFixture<Resume02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Resume02Component],
		})
		fixture = TestBed.createComponent(Resume02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
