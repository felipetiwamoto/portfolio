import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingPagesComponent} from './landing-pages.component'
import {LandingPagesRoutingModule} from './landing-pages-routing.module'
import {LandingPage01Module} from './pages/landing-page01/landing-page01.module'
import {LandingPage02Module} from './pages/landing-page02/landing-page02.module'
import {LandingPage03Module} from './pages/landing-page03/landing-page03.module'
import {LandingPage04Module} from './pages/landing-page04/landing-page04.module'
import {LandingPage05Module} from './pages/landing-page05/landing-page05.module'
import {LandingPage06Module} from './pages/landing-page06/landing-page06.module'
import {LandingPage07Module} from './pages/landing-page07/landing-page07.module'
import {LandingPage08Module} from './pages/landing-page08/landing-page08.module'
import {LandingPage09Module} from './pages/landing-page09/landing-page09.module'
import {LandingPage10Module} from './pages/landing-page10/landing-page10.module'

@NgModule({
	declarations: [LandingPagesComponent],
	imports: [
		CommonModule,
		LandingPage01Module,
		LandingPage02Module,
		LandingPage03Module,
		LandingPage04Module,
		LandingPage05Module,
		LandingPage06Module,
		LandingPage07Module,
		LandingPage08Module,
		LandingPage09Module,
		LandingPage10Module,
		LandingPagesRoutingModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPagesModule {}
