import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SimpleAngularRoutingModule} from './simple-angular-routing.module'
import {SimpleAngularComponent} from './simple-angular.component'
import {SnGridModule} from './modules/sn-grid/sn-grid.module'
import {SnCarouselModule} from './modules/sn-carousel/sn-carousel.module'

@NgModule({
	declarations: [SimpleAngularComponent],
	imports: [CommonModule, SimpleAngularRoutingModule, SnGridModule, SnCarouselModule],
	exports: [SnGridModule, SnCarouselModule],
})
export class SimpleAngularModule {}
