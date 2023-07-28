import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
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
import {ProjectsRoutingModule} from './projects-routing.module'

@NgModule({
	declarations: [
		ProjectsComponent,
		Project01Component,
		Project02Component,
		Project03Component,
		Project04Component,
		Project05Component,
		Project06Component,
		Project07Component,
		Project08Component,
		Project09Component,
		Project10Component,
	],
	imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
