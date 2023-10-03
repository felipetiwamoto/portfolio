import {Directive, ElementRef, Input, OnInit} from '@angular/core'

@Directive({
	selector: '[sn-column]',
})
export class SnColumnDirective implements OnInit {
	@Input('sn-column') snColumn: string = '12 12 12 12 12 12'

	constructor(private elRef: ElementRef) {}

	ngOnInit(): void {
		const columns: number[] = this.snColumn.split(' ').map((n) => Number(n))

		if (!isNaN(columns[0]) && columns[0] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__column_xs_${columns[0]}`)
		if (!isNaN(columns[1]) && columns[1] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__column_sm_${columns[1]}`)
		if (!isNaN(columns[2]) && columns[2] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__column_md_${columns[2]}`)
		if (!isNaN(columns[3]) && columns[3] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__column_lg_${columns[3]}`)
		if (!isNaN(columns[4]) && columns[4] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__column_xl_${columns[4]}`)
		if (!isNaN(columns[5]) && columns[5] !== 0)
			this.elRef.nativeElement.classList.add(`sn_row__column_xxl_${columns[5]}`)
	}
}
