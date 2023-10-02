import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {Resume01Component} from './pages/resume01/resume01.component'
import {Resume02Component} from './pages/resume02/resume02.component'

const routes: Routes = [
	{
		path: 'resumes',
		children: [
			{path: 'pt', component: Resume01Component},
			{path: 'en', component: Resume02Component},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ResumesRoutingModule {}
