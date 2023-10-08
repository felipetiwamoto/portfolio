import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnPost02Component} from './sn-post02.component'

describe('SnPost02Component', () => {
	let component: SnPost02Component
	let fixture: ComponentFixture<SnPost02Component>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnPost02Component],
		})
		fixture = TestBed.createComponent(SnPost02Component)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
