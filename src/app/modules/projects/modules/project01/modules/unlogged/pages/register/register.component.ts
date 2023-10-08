import {Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {snValidator} from 'src/app/modules/simple-angular/helpers/sn-validator'
import {SnCarousel} from 'src/app/modules/simple-angular/modules/sn-carousel/sn-carousel.interface'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	public formStep01 = this.fb.group({
		name: [null, [snValidator.required]],
		surname: [null, [snValidator.required]],
		email: [null, [snValidator.required]],
	})
	public formStep02 = this.fb.group({
		password: [null, [snValidator.required]],
		confirmPassword: [null, [snValidator.required]],
	})

	public snCarouselConfig: SnCarousel = {
		// arrow_size: "30px",
		// arrow_container: "calc(100% + 80px)",
		// arrow_enabled: false,
		active_item: 0,
		item_gap: '100vw',
		arrow_enabled: false,
		bullet_enabled: false,
	}

	constructor(private fb: FormBuilder) {}

	setActiveItemByIndex(index: number) {
		this.snCarouselConfig = {...this.snCarouselConfig, active_item: index}
	}

	handleFormStep01Submit() {
		this.setActiveItemByIndex(1)
	}

	handleFormStep02Submit() {}
}
