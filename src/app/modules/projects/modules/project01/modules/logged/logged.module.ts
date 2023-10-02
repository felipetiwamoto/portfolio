import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {LoggedRoutingModule} from './logged-routing.module'
import {FeedComponent} from './components/feed/feed.component'
import {MainComponent} from './components/main/main.component'
import {PostComponent} from './components/post/post.component'
import {CommentComponent} from './components/comment/comment.component'
import {AboutMeComponent} from './pages/about-me/about-me.component'
import {CommunitiesComponent} from './pages/communities/communities.component'
import {ContactsComponent} from './pages/contacts/contacts.component'
import {HomeComponent} from './pages/home/home.component'
import {SettingsComponent} from './pages/settings/settings.component'
import {ProfileComponent} from './pages/profile/profile.component'

@NgModule({
	declarations: [
		AboutMeComponent,
		CommunitiesComponent,
		ContactsComponent,
		HomeComponent,
		SettingsComponent,
		FeedComponent,
		MainComponent,
		PostComponent,
		CommentComponent,
		ProfileComponent,
	],
	imports: [CommonModule, LoggedRoutingModule],
})
export class LoggedModule {}
