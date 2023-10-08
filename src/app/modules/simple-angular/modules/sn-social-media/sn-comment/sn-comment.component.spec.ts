import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SnCommentComponent} from './sn-comment.component'

describe('SnCommentComponent', () => {
	let component: SnCommentComponent
	let fixture: ComponentFixture<SnCommentComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SnCommentComponent],
		})
		fixture = TestBed.createComponent(SnCommentComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
