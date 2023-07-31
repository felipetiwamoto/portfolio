import {Component} from '@angular/core'

@Component({
	selector: 'app-root',
	template: `
		<a routerLink="/landing-pages/01">landing-pages01</a><br />
		<a routerLink="/projects/01">projects01</a><br />
		<a routerLink="/resumes/01">resume01</a><br />
		<br />

		<router-outlet></router-outlet>
	`,
})
export class AppComponent {}
