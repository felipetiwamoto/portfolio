import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MainComponent} from './components/main/main.component'
import {HomeComponent} from './pages/home/home.component'
import {ContactsComponent} from './pages/contacts/contacts.component'
import {SettingsComponent} from './pages/settings/settings.component'
import {CommunitiesComponent} from './pages/communities/communities.component'
import {AboutMeComponent} from './pages/about-me/about-me.component'
import {ProfileComponent} from './pages/profile/profile.component'

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{path: '', component: HomeComponent},
			{path: 'contacts', component: ContactsComponent},
			{path: 'settings', component: SettingsComponent},
			{path: 'communities', component: CommunitiesComponent},
			{path: 'about-me', component: AboutMeComponent},
			{path: 'feed/:profileURL', component: ProfileComponent},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoggedRoutingModule {}
