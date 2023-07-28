import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingPagesComponent} from './landing-pages.component'
import {LandingPage01Component} from './pages/landing-page01/landing-page01.component'
import {LandingPage02Component} from './pages/landing-page02/landing-page02.component'
import {LandingPage03Component} from './pages/landing-page03/landing-page03.component'
import {LandingPage04Component} from './pages/landing-page04/landing-page04.component'
import {LandingPage05Component} from './pages/landing-page05/landing-page05.component'
import {LandingPage06Component} from './pages/landing-page06/landing-page06.component'
import {LandingPage07Component} from './pages/landing-page07/landing-page07.component'
import {LandingPage08Component} from './pages/landing-page08/landing-page08.component'
import {LandingPage09Component} from './pages/landing-page09/landing-page09.component'
import {LandingPage10Component} from './pages/landing-page10/landing-page10.component'
import {LandingPagesRoutingModule} from './landing-pages-routing.module'

@NgModule({
	declarations: [
		LandingPagesComponent,
		LandingPage01Component,
		LandingPage02Component,
		LandingPage03Component,
		LandingPage04Component,
		LandingPage05Component,
		LandingPage06Component,
		LandingPage07Component,
		LandingPage08Component,
		LandingPage09Component,
		LandingPage10Component,
	],
	imports: [CommonModule, LandingPagesRoutingModule],
})
export class LandingPagesModule {}
