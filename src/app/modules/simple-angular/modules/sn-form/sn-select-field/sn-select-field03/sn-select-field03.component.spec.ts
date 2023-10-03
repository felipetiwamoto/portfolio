import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnSelectField03Component} from './sn-select-field03.component'

describe('SnSelectField03Component', () => {
	let component: SnSelectField03Component
	let fixture: ComponentFixture<SnSelectField03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnSelectField03Component],
		})
		fixture = TestBed.createComponent(SnSelectField03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
