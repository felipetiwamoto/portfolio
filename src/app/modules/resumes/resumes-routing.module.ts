import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ResumesComponent} from './resumes.component'
import {Resume01Component} from './pages/resume01/resume01.component'
import {Resume02Component} from './pages/resume02/resume02.component'
import {Resume03Component} from './pages/resume03/resume03.component'
import {Resume04Component} from './pages/resume04/resume04.component'
import {Resume05Component} from './pages/resume05/resume05.component'
import {Resume06Component} from './pages/resume06/resume06.component'
import {Resume07Component} from './pages/resume07/resume07.component'
import {Resume08Component} from './pages/resume08/resume08.component'
import {Resume09Component} from './pages/resume09/resume09.component'
import {Resume10Component} from './pages/resume10/resume10.component'

const routes: Routes = [
	{
		path: '',
		component: ResumesComponent,
		children: [
			{path: 'pt', component: Resume01Component},
			{path: 'en', component: Resume02Component},
			// {path: '03', component: Resume03Component},
			// {path: '04', component: Resume04Component},
			// {path: '05', component: Resume05Component},
			// {path: '06', component: Resume06Component},
			// {path: '07', component: Resume07Component},
			// {path: '08', component: Resume08Component},
			// {path: '09', component: Resume09Component},
			// {path: '10', component: Resume10Component},
		],
	},
	{path: '**', redirectTo: '/projects/01'},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ResumesRoutingModule {}
