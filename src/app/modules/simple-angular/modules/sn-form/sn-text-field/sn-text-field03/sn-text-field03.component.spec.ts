import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnTextField03Component} from './sn-text-field03.component'

describe('SnTextField03Component', () => {
	let component: SnTextField03Component
	let fixture: ComponentFixture<SnTextField03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnTextField03Component],
		})
		fixture = TestBed.createComponent(SnTextField03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
