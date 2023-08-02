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
import {SkillComponent} from './components/skill/skill.component'
import {Skill01Component} from './components/skill/skill01/skill01.component'
import {Skill02Component} from './components/skill/skill02/skill02.component'
import {Skill03Component} from './components/skill/skill03/skill03.component'
import {ContactComponent} from './components/contact/contact.component'
import {Contact01Component} from './components/contact/contact01/contact01.component'
import {Contact02Component} from './components/contact/contact02/contact02.component'
import {Contact03Component} from './components/contact/contact03/contact03.component'
import {ExperienceComponent} from './components/experience/experience.component'
import {Experience01Component} from './components/experience/experience01/experience01.component'
import {Experience02Component} from './components/experience/experience02/experience02.component'
import {Experience03Component} from './components/experience/experience03/experience03.component'
import {EducationComponent} from './components/education/education.component'
import {Education01Component} from './components/education/education01/education01.component'
import {Education02Component} from './components/education/education02/education02.component'
import {Education03Component} from './components/education/education03/education03.component'
import {LanguageComponent} from './components/language/language.component'
import {Language01Component} from './components/language/language01/language01.component'
import {Language02Component} from './components/language/language02/language02.component'
import {Language03Component} from './components/language/language03/language03.component'

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
		SkillComponent,
		Skill01Component,
		Skill02Component,
		Skill03Component,
		ContactComponent,
		Contact01Component,
		Contact02Component,
		Contact03Component,
		ExperienceComponent,
		Experience01Component,
		Experience02Component,
		Experience03Component,
		EducationComponent,
		Education01Component,
		Education02Component,
		Education03Component,
		LanguageComponent,
		Language01Component,
		Language02Component,
		Language03Component,
	],
	imports: [CommonModule, ResumesRoutingModule],
})
export class ResumesModule {}
