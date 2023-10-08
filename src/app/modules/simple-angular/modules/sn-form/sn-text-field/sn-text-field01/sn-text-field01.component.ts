import {Component, Input} from '@angular/core'
import {Subject} from 'rxjs'

@Component({
	selector: 'sn-text-field01',
	templateUrl: './sn-text-field01.component.html',
	styleUrls: ['./sn-text-field01.component.scss'],
})
export class SnTextField01Component {
	@Input() form?: any

	@Input() class?: string = ''
	@Input() leftIcon?: string = ''
	@Input() rightIcon?: string = ''
	@Input() label?: string = ''

	@Input() type?: string = 'text'
	@Input() placeholder?: string = ''
	@Input() id?: string = ''
	@Input() name: string = ''

	@Input() click = new Subject()
	@Input() change = new Subject()
	@Input() blur = new Subject()
	@Input() mouseover = new Subject()
	@Input() mouseout = new Subject()
	@Input() keyup = new Subject()
	@Input() keydown = new Subject()
	@Input() keypress = new Subject()

	get errors() {
		const control = this.form?.get(this.name)
		if (!control.touched) return ''
		return Object.values(control.errors || {})[0] || ''
	}

	get hasErrors(): string {
		const control = this.form?.get(this.name)
		return control.touched && Object.values(control.errors || {}).length > 0 ? 'has_errors' : ''
	}

	get isFilled(): string {
		const control = this.form?.get(this.name)
		return control.touched && control.value.trim().length > 0 ? 'is_filled' : ''
	}

	get isSuccess(): string {
		const control = this.form?.get(this.name)
		return control.touched && control.valid ? 'is_success' : ''
	}
}
