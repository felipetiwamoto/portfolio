import {Component} from '@angular/core'
import {Question} from '../../interfaces/question.interface'

@Component({
	selector: 'lp01-faq',
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
	public questions?: Question[] = [
		{
			category: ['General', 'Payments'],
			isOpened: false,
			question: 'What services does TanahAir Offer?',
			anwser: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
		},
		{
			category: ['General', 'Payments'],
			isOpened: false,
			question: 'Why should i choose a Design studio like TanahAir over full-service agency?',
			anwser: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer',
		},
		{
			category: ['General', 'Services'],
			isOpened: false,
			question: 'How does TanahAir create website content without knowing our Business plan?',
			anwser: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer',
		},
		{
			category: ['General', 'Services'],
			isOpened: false,
			question: 'What will be delivered? And When?',
			anwser: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
		},
		{
			category: ['General', 'Refund'],
			isOpened: false,
			question: 'What often will results be reported?',
			anwser: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
		},
		{
			category: ['General', 'Contact'],
			isOpened: false,
			question: 'How Quickly will i start seeing result after working with TanahAir?',
			anwser: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer',
		},
	]

	get getQuestionsCategories() {
		let categories: any = ['General']
		for (let q of this.questions || []) for (let c of q.category || []) categories.push(c)
		const uniques = Array.from(new Set(categories))
		return uniques
	}
}
