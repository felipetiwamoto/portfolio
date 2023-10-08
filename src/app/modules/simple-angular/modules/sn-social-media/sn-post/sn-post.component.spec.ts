import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnPostComponent} from './sn-post.component'

describe('SnPostComponent', () => {
	let component: SnPostComponent
	let fixture: ComponentFixture<SnPostComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnPostComponent],
		})
		fixture = TestBed.createComponent(SnPostComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
