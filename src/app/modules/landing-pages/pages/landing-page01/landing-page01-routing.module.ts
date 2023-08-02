import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LandingPage01Component} from './landing-page01.component'

const routes: Routes = [
	{
		path: '01',
		component: LandingPage01Component,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LandingPage01RoutingModule {}
