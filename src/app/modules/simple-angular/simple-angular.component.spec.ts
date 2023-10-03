import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SimpleAngularComponent} from './simple-angular.component'

describe('SimpleAngularComponent', () => {
	let component: SimpleAngularComponent
	let fixture: ComponentFixture<SimpleAngularComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SimpleAngularComponent],
		})
		fixture = TestBed.createComponent(SimpleAngularComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
