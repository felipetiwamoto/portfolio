import {Directive, ElementRef, Input, OnInit} from '@angular/core'

@Directive({
	selector: '[sn-offset]',
})
export class SnOffsetDirective implements OnInit {
	@Input('sn-offset') snOffset: string = '12 12 12 12 12 12'

	constructor(private elRef: ElementRef) {}

	ngOnInit(): void {
		const offsets: number[] = this.snOffset.split(' ').map((n) => Number(n))

		if (!isNaN(offsets[0]) && offsets[0] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__offset_xs_${offsets[0]}`)
		if (!isNaN(offsets[1]) && offsets[1] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__offset_sm_${offsets[1]}`)
		if (!isNaN(offsets[2]) && offsets[2] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__offset_md_${offsets[2]}`)
		if (!isNaN(offsets[3]) && offsets[3] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__offset_lg_${offsets[3]}`)
		if (!isNaN(offsets[4]) && offsets[4] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__offset_xl_${offsets[4]}`)
		if (!isNaN(offsets[5]) && offsets[5] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__offset_xxl_${offsets[5]}`)
	}
}
