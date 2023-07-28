import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ProjectsComponent} from './projects.component'
import {Project01Component} from './pages/project01/project01.component'
import {Project02Component} from './pages/project02/project02.component'
import {Project03Component} from './pages/project03/project03.component'
import {Project04Component} from './pages/project04/project04.component'
import {Project05Component} from './pages/project05/project05.component'
import {Project06Component} from './pages/project06/project06.component'
import {Project07Component} from './pages/project07/project07.component'
import {Project08Component} from './pages/project08/project08.component'
import {Project09Component} from './pages/project09/project09.component'
import {Project10Component} from './pages/project10/project10.component'

const routes: Routes = [
	{
		path: 'projects',
		component: ProjectsComponent,
		children: [
			{path: '01', component: Project01Component},
			{path: '02', component: Project02Component},
			{path: '03', component: Project03Component},
			{path: '04', component: Project04Component},
			{path: '05', component: Project05Component},
			{path: '06', component: Project06Component},
			{path: '07', component: Project07Component},
			{path: '08', component: Project08Component},
			{path: '09', component: Project09Component},
			{path: '10', component: Project10Component},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectsRoutingModule {}
