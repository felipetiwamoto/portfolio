import {Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {snValidator} from 'src/app/modules/simple-angular/helpers/sn-validator'

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	public form = this.fb.group({
		term: [null, [snValidator.required, snValidator.maxLength(3)]],
	})
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}
}
