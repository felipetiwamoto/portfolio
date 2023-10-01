import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LandingPage02Component} from './landing-page02.component'
import {CardComponent} from './components/card/card.component'
import {AboutUsComponent} from './components/about-us/about-us.component'
import {BlogComponent} from './components/blog/blog.component'
import {FooterComponent} from './components/footer/footer.component'
import {HeaderComponent} from './components/header/header.component'
import {NavComponent} from './components/nav/nav.component'
import {PartnerComponent} from './components/partner/partner.component'
import {PriceComponent} from './components/price/price.component'
import {ServiceComponent} from './components/service/service.component'
import {TestimonyComponent} from './components/testimony/testimony.component'

@NgModule({
	declarations: [
		LandingPage02Component,
		CardComponent,
		AboutUsComponent,
		BlogComponent,
		FooterComponent,
		HeaderComponent,
		NavComponent,
		PartnerComponent,
		PriceComponent,
		ServiceComponent,
		TestimonyComponent,
	],
	imports: [CommonModule],
})
export class LandingPage02Module {}
