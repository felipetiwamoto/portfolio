import {Directive, ElementRef, Input, OnInit} from '@angular/core'

@Directive({
	selector: '[sn-push]',
})
export class SnPushDirective implements OnInit {
	@Input('sn-push') snPush: string = '12 12 12 12 12 12'

	constructor(private elRef: ElementRef) {}

	ngOnInit(): void {
		const pushs: number[] = this.snPush.split(' ').map((n) => Number(n))

		if (!isNaN(pushs[0]) && pushs[0] !== 0) this.elRef.nativeElement.classList.add(`sn_row__push_xs_${pushs[0]}`)
		if (!isNaN(pushs[1]) && pushs[1] !== 0) this.elRef.nativeElement.classList.add(`sn_row__push_sm_${pushs[1]}`)
		if (!isNaN(pushs[2]) && pushs[2] !== 0) this.elRef.nativeElement.classList.add(`sn_row__push_md_${pushs[2]}`)
		if (!isNaN(pushs[3]) && pushs[3] !== 0) this.elRef.nativeElement.classList.add(`sn_row__push_lg_${pushs[3]}`)
		if (!isNaN(pushs[4]) && pushs[4] !== 0) this.elRef.nativeElement.classList.add(`sn_row__push_xl_${pushs[4]}`)
		if (!isNaN(pushs[5]) && pushs[5] !== 0) this.elRef.nativeElement.classList.add(`sn_row__push_xxl_${pushs[5]}`)
	}
}
