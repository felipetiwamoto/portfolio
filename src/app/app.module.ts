import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {ResumesModule} from './modules/resumes/resumes.module'
import {LandingPagesModule} from './modules/landing-pages/landing-pages.module'
import {ProjectsModule} from './modules/projects/projects.module'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, ResumesModule, LandingPagesModule, ProjectsModule],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
