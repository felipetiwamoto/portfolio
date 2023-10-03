import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextField02Component} from './sn-text-field02.component'

describe('SnTextField02Component', () => {
	let component: SnTextField02Component
	let fixture: ComponentFixture<SnTextField02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextField02Component],
		})
		fixture = TestBed.createComponent(SnTextField02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
