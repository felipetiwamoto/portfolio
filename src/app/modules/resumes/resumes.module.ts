import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
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
import {ResumesRoutingModule} from './resumes-routing.module'

@NgModule({
	declarations: [
		ResumesComponent,
		Resume01Component,
		Resume02Component,
		Resume03Component,
		Resume04Component,
		Resume05Component,
		Resume06Component,
		Resume07Component,
		Resume08Component,
		Resume09Component,
		Resume10Component,
	],
	imports: [CommonModule, ResumesRoutingModule],
})
export class ResumesModule {}
