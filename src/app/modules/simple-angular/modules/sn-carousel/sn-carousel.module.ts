import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SnCarouselComponent} from './sn-carousel.component'
import {SnCarousel01Component} from './components/sn-carousel01/sn-carousel01.component'
import {SnCarouselItemComponent} from './components/sn-carousel-item/sn-carousel-item.component'

@NgModule({
	declarations: [SnCarouselComponent, SnCarousel01Component, SnCarouselItemComponent],
	imports: [CommonModule],
	exports: [SnCarouselComponent, SnCarousel01Component, SnCarouselItemComponent],
})
export class SnCarouselModule {}
