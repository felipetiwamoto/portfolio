import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
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

const routes: Routes = [
	{
		path: 'landing-pages',
		component: LandingPagesComponent,
		children: [
			{path: '01', component: LandingPage01Component},
			{path: '02', component: LandingPage02Component},
			{path: '03', component: LandingPage03Component},
			{path: '04', component: LandingPage04Component},
			{path: '05', component: LandingPage05Component},
			{path: '06', component: LandingPage06Component},
			{path: '07', component: LandingPage07Component},
			{path: '08', component: LandingPage08Component},
			{path: '09', component: LandingPage09Component},
			{path: '10', component: LandingPage10Component},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LandingPagesRoutingModule {}
