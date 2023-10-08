import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnComment01Component} from './sn-comment01.component'

describe('SnComment01Component', () => {
	let component: SnComment01Component
	let fixture: ComponentFixture<SnComment01Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnComment01Component],
		})
		fixture = TestBed.createComponent(SnComment01Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
