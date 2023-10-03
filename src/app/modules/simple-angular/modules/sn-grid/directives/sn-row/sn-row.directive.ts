import {Directive, ElementRef, Input, OnInit} from '@angular/core'

@Directive({
	selector: '[sn-row]',
})
export class SnRowDirective implements OnInit {
	@Input('sn-row') snRow: string = ''

	constructor(private elRef: ElementRef) {}

	ngOnInit(): void {
		this.elRef.nativeElement.classList.add('sn_row')

		const classes: string[] = this.snRow.split(' ')
		const size: string = classes[0] || 'medium'
		const maxColumns: string = classes[1] || 'twelve'

		!!size && this.elRef.nativeElement.classList.add(size)
		!!maxColumns && this.elRef.nativeElement.classList.add(maxColumns)
	}
}
