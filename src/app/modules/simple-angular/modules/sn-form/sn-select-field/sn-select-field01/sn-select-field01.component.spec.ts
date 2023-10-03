import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnSelectField01Component} from './sn-select-field01.component'

describe('SnSelectField01Component', () => {
	let component: SnSelectField01Component
	let fixture: ComponentFixture<SnSelectField01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnSelectField01Component],
		})
		fixture = TestBed.createComponent(SnSelectField01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
