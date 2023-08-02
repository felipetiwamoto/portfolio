import {ComponentFixture, TestBed} from '@angular/core/testing'

import {Language01Component} from './language01.component'

describe('Language01Component', () => {
	let component: Language01Component
	let fixture: ComponentFixture<Language01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [Language01Component],
		})
		fixture = TestBed.createComponent(Language01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
