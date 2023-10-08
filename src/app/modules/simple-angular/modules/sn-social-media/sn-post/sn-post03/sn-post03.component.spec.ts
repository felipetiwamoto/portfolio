import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnPost03Component} from './sn-post03.component'

describe('SnPost03Component', () => {
	let component: SnPost03Component
	let fixture: ComponentFixture<SnPost03Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnPost03Component],
		})
		fixture = TestBed.createComponent(SnPost03Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
