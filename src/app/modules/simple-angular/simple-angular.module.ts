import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SimpleAngularRoutingModule} from './simple-angular-routing.module'
import {SimpleAngularComponent} from './simple-angular.component'
import {SnGridModule} from './modules/sn-grid/sn-grid.module'
import {SnCarouselModule} from './modules/sn-carousel/sn-carousel.module'
import {SnFormModule} from './modules/sn-form/sn-form.module'
import {SnSocialMediaModule} from './modules/sn-social-media/sn-social-media.module'

@NgModule({
	declarations: [SimpleAngularComponent],
	imports: [
		CommonModule,
		SimpleAngularRoutingModule,
		SnGridModule,
		SnCarouselModule,
		SnFormModule,
		SnSocialMediaModule,
	],
	exports: [SnGridModule, SnCarouselModule, SnFormModule, SnSocialMediaModule],
})
export class SimpleAngularModule {}
