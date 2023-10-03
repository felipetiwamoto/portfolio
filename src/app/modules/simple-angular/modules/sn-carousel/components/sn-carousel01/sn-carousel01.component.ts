import {
	AfterViewInit,
	Component,
	ContentChildren,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	QueryList,
	Renderer2,
	SimpleChanges,
	ViewChild,
} from '@angular/core'
import {SnCarouselItemComponent} from './../sn-carousel-item/sn-carousel-item.component'
import {SnCarousel} from '../../sn-carousel.interface'

@Component({
	selector: 'sn-carousel01',
	templateUrl: './sn-carousel01.component.html',
	styleUrls: ['./sn-carousel01.component.scss'],
})
export class SnCarousel01Component implements OnInit, OnChanges, AfterViewInit {
	@ViewChild('snCarousel') snCarousel?: ElementRef
	@ViewChild('snCarouselContainer') snCarouselContainer?: ElementRef

	@ContentChildren(SnCarouselItemComponent) snCarouselItems!: QueryList<SnCarouselItemComponent>

	defaultConfig: SnCarousel = {
		auto: false,
		timer: 5000,
		reverse: false,
		pause_on_mouseover: true,
		active_item: 0,
		item_gap: '15px',
		bullet_enabled: true,
		bullet_size: '7px',
		bullet_gap: '5px',
		bullet_bottom: '20px',
		bullet_top: 'initial',
		bullet_bg_color: 'var(--greyf)',
		bullet_active_bg_color: 'var(--primary)',
		arrow_enabled: true,
		arrow_disabled_on_reach_end: false,
		arrow_size: '40px',
		arrow_icon_size: '18px',
		arrow_bg_color: 'var(--primary)',
		arrow_color: 'var(--greyf)',
		arrow_container: 'calc(100% - 30px)',
	}

	@Input() config: SnCarousel | any = {}

	private autoRunInterval: any

	constructor(private renderer2: Renderer2) {}

	ngOnInit(): void {
		this.config = {...this.defaultConfig, ...this.config}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.config = {...this.defaultConfig, ...this.config}
	}

	ngAfterViewInit(): void {
		this.configInit()
		this.autoRun()
		this.pauseOnMouseOverRun()
		this.slideTo(this.config.active_item)
	}

	configInit() {
		for (let key of Object.keys(this.config || {}) || [])
			this.renderer2.setProperty(this.snCarousel?.nativeElement, `--sn_carousel01_${key}`, this.config[key])
	}

	autoRun() {
		if (!this.config.auto) return
		this.autoRunInterval = setInterval(() => (!this.config.reverse ? this.next() : this.prev()), this.config.timer)
	}

	pauseOnMouseOverRun() {
		if (!this.config.pause_on_mouseover) return
		this.snCarouselContainer?.nativeElement.addEventListener(`mouseover`, () => clearInterval(this.autoRunInterval))
		this.snCarouselContainer?.nativeElement.addEventListener(`mouseout`, () => this.autoRun())
	}

	slideTo(index: number) {
		this.config.active_item = index
		this.renderer2.setStyle(this.snCarouselContainer?.nativeElement, '--sn_carousel01_active_item', index)
	}

	isPrevDisabled() {
		if (!this.config.arrow_disabled_on_reach_end) return
		return this.config.active_item <= 0
	}

	isNextDisabled() {
		return this.config.arrow_disabled_on_reach_end && this.config.active_item + 1 >= this.snCarouselItems.length
	}

	prev() {
		if (this.config.arrow_disabled_on_reach_end && this.isPrevDisabled()) return
		if (this.config.active_item <= 0) this.config.active_item = this.snCarouselItems.length
		this.slideTo(--this.config.active_item)
	}

	next() {
		if (this.config.arrow_disabled_on_reach_end && this.isNextDisabled()) return
		if (this.config.active_item + 1 >= this.snCarouselItems.length) this.config.active_item = -1
		this.slideTo(++this.config.active_item)
	}
}
