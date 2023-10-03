import {Directive, ElementRef, Input, OnInit} from '@angular/core'

@Directive({
	selector: '[sn-order]',
})
export class SnOrderDirective implements OnInit {
	@Input('sn-order') snOrder: string = '12 12 12 12 12 12'

	constructor(private elRef: ElementRef) {}

	ngOnInit(): void {
		const orders: number[] = this.snOrder.split(' ').map((n) => Number(n))

		if (!isNaN(orders[0]) && orders[0] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__order_xs_${orders[0]}`)
		if (!isNaN(orders[1]) && orders[1] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__order_sm_${orders[1]}`)
		if (!isNaN(orders[2]) && orders[2] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__order_md_${orders[2]}`)
		if (!isNaN(orders[3]) && orders[3] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__order_lg_${orders[3]}`)
		if (!isNaN(orders[4]) && orders[4] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__order_xl_${orders[4]}`)
		if (!isNaN(orders[5]) && orders[5] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__order_xxl_${orders[5]}`)
	}
}
