import {Component} from '@angular/core'

@Component({
	selector: 'app-root',
	template: `
		<a routerLink="/resumes/01">Resumes</a><br />
		<a routerLink="/landing-pages/01">Landing Pages</a><br />
		<a routerLink="/projects/01">Projects</a><br />
		<br />
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {}
