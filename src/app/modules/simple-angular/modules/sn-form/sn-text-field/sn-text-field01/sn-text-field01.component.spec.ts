import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextField01Component} from './sn-text-field01.component'

describe('SnTextField01Component', () => {
	let component: SnTextField01Component
	let fixture: ComponentFixture<SnTextField01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextField01Component],
		})
		fixture = TestBed.createComponent(SnTextField01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
