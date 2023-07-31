import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Language03Component} from './language03.component'

describe('Language03Component', () => {
	let component: Language03Component
	let fixture: ComponentFixture<Language03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Language03Component],
		})
		fixture = TestBed.createComponent(Language03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
