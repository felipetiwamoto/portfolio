import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnComment03Component} from './sn-comment03.component'

describe('SnComment03Component', () => {
	let component: SnComment03Component
	let fixture: ComponentFixture<SnComment03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnComment03Component],
		})
		fixture = TestBed.createComponent(SnComment03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
