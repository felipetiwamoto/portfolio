import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnSelectFieldComponent} from './sn-select-field.component'

describe('SnSelectFieldComponent', () => {
	let component: SnSelectFieldComponent
	let fixture: ComponentFixture<SnSelectFieldComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnSelectFieldComponent],
		})
		fixture = TestBed.createComponent(SnSelectFieldComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
