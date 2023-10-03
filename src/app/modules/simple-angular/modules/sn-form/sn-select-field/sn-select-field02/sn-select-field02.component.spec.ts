import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnSelectField02Component} from './sn-select-field02.component'

describe('SnSelectField02Component', () => {
	let component: SnSelectField02Component
	let fixture: ComponentFixture<SnSelectField02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnSelectField02Component],
		})
		fixture = TestBed.createComponent(SnSelectField02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
