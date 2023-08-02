import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NavbarComponent} from './components/navbar/navbar.component'
import {HeaderComponent} from './components/header/header.component'
import {OurServicesComponent} from './components/our-services/our-services.component'
import {InformationComponent} from './components/information/information.component'
import {ServiceComponent} from './components/service/service.component'
import {Service01Component} from './components/service/service01/service01.component'
import {AboutUsComponent} from './components/about-us/about-us.component'
import {NewsletterComponent} from './components/newsletter/newsletter.component'
import {OurTeamComponent} from './components/our-team/our-team.component'
import {Person01Component} from './components/person/person01/person01.component'
import {MilestoneComponent} from './components/milestone/milestone.component'
import {PortfolioComponent} from './components/portfolio/portfolio.component'
import {ProjectComponent} from './components/project/project.component'
import {Project01Component} from './components/project/project01/project01.component'
import {FaqComponent} from './components/faq/faq.component'
import {TabComponent} from './components/tab/tab.component'
import {Tab01Component} from './components/tab/tab01/tab01.component'
import {QuestionComponent} from './components/question/question.component'
import {Question01Component} from './components/question/question01/question01.component'
import {FooterComponent} from './components/footer/footer.component'

@NgModule({
	declarations: [
		NavbarComponent,
		HeaderComponent,
		OurServicesComponent,
		InformationComponent,
		ServiceComponent,
		Service01Component,
		AboutUsComponent,
		NewsletterComponent,
		OurTeamComponent,
		Person01Component,
		MilestoneComponent,
		PortfolioComponent,
		ProjectComponent,
		Project01Component,
		FaqComponent,
		TabComponent,
		Tab01Component,
		QuestionComponent,
		Question01Component,
		FooterComponent,
	],
	exports: [
		NavbarComponent,
		HeaderComponent,
		OurServicesComponent,
		InformationComponent,
		ServiceComponent,
		Service01Component,
		AboutUsComponent,
		NewsletterComponent,
		OurTeamComponent,
		Person01Component,
		MilestoneComponent,
		PortfolioComponent,
		ProjectComponent,
		Project01Component,
		FaqComponent,
		TabComponent,
		Tab01Component,
		QuestionComponent,
		Question01Component,
		FooterComponent,
	],
	imports: [CommonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPage01Module {}
