import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnPost01Component} from './sn-post01.component'

describe('SnPost01Component', () => {
	let component: SnPost01Component
	let fixture: ComponentFixture<SnPost01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnPost01Component],
		})
		fixture = TestBed.createComponent(SnPost01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
