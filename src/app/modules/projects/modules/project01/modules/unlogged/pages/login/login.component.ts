import {Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {snValidator} from 'src/app/modules/simple-angular/helpers/sn-validator'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	public form = this.fb.group({
		email: [null, [snValidator.required]],
		password: [null, [snValidator.required, snValidator.minLength(6)]],
	})

	constructor(private fb: FormBuilder) {}

	handleFormSubmit() {}
}
