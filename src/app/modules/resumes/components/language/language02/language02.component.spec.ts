import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Language02Component} from './language02.component'

describe('Language02Component', () => {
	let component: Language02Component
	let fixture: ComponentFixture<Language02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Language02Component],
		})
		fixture = TestBed.createComponent(Language02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
