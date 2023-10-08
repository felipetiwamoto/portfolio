import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SnPostComponent} from './sn-post/sn-post.component'
import {SnPost01Component} from './sn-post/sn-post01/sn-post01.component'
import {SnPost02Component} from './sn-post/sn-post02/sn-post02.component'
import {SnPost03Component} from './sn-post/sn-post03/sn-post03.component'
import {SnCommentComponent} from './sn-comment/sn-comment.component'
import {SnComment01Component} from './sn-comment/sn-comment01/sn-comment01.component'
import {SnComment02Component} from './sn-comment/sn-comment02/sn-comment02.component'
import {SnComment03Component} from './sn-comment/sn-comment03/sn-comment03.component'

@NgModule({
	declarations: [
		SnPostComponent,
		SnPost01Component,
		SnPost02Component,
		SnPost03Component,
		SnCommentComponent,
		SnComment01Component,
		SnComment02Component,
		SnComment03Component,
	],
	imports: [CommonModule],
})
export class SnSocialMediaModule {}
