import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingPagesComponent} from './landing-pages.component'
import {LandingPagesRoutingModule} from './landing-pages-routing.module'
import {LandingPage01Component} from './pages/landing-page01/landing-page01.component'
import {NavbarComponent} from './pages/landing-page01/components/navbar/navbar.component'

@NgModule({
	declarations: [LandingPagesComponent, LandingPage01Component, NavbarComponent],
	imports: [CommonModule, LandingPagesRoutingModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPagesModule {}
