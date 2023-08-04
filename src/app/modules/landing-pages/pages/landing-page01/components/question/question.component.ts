import {Component, Input} from '@angular/core'
import {Question} from '../../interfaces/question.interface'

@Component({
	selector: 'lp01-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
	@Input() question?: Question
}
