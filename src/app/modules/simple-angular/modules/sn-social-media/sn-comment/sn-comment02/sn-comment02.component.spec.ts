import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnComment02Component} from './sn-comment02.component'

describe('SnComment02Component', () => {
	let component: SnComment02Component
	let fixture: ComponentFixture<SnComment02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnComment02Component],
		})
		fixture = TestBed.createComponent(SnComment02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
