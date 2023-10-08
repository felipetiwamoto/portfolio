import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'
import {snValidatorMessage as msg} from './sn-validator-message'
import {snDate} from './sn-date'

export const snValidator = {
	required: (control: AbstractControl): ValidationErrors | null => {
		if (!control?.value || !control?.value.trim().length) return {required: msg['required']}
		return null
	},
	requiredBoolean: (control: AbstractControl): ValidationErrors | null => {
		if (!control?.value) return {required: msg['required']}
		return null
	},
	arrayRequired: (control: AbstractControl): {[key: string]: any} | null => {
		if (!control.value || !control.value.length) return {required: msg['required']}
		if (!control?.value.length) return {required: msg['required']}

		return null
	},
	numberRequired: (control: AbstractControl): {[key: string]: any} | null => {
		if (isNaN(control.value)) return {required: msg['required']}
		return null
	},
	openingHours: (control: AbstractControl): {[key: string]: any} | null => {
		if (!control.value || !control.value.length) return {required: msg['required']}
		if (Number(control.value.replace(':', '')) === 0) return {openingHours: msg['openingHours']}

		return null
	},
	fromLowerThanTo: (control: AbstractControl): {[key: string]: any} | null => {
		if (!control.value || !control.value.length) return {required: msg['required']}

		const form = control.parent
		const from = Number(form?.value.from.replace(':', ''))
		const to = Number(control.value.replace(':', ''))

		if (to < from) return {fromLowerThanTo: msg['fromLowerThanTo']}

		return null
	},
	length: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {length: msg['required']}
			if (control?.value.trim().length !== value)
				return {length: msg['length'].replace('{length}', value.toString())}
			return null
		}
	},
	minLength: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {minLength: msg['required']}
			if (control?.value.trim().length < value)
				return {minLength: msg['minLength'].replace('{minLength}', value.toString())}
			return null
		}
	},
	maxLength: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {maxLength: msg['required']}
			if (control?.value.trim().length > value)
				return {maxLength: msg['maxLength'].replace('{maxLength}', value.toString())}
			return null
		}
	},
	lengthBetween: (min: number, max: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {lengthBetween: msg['required']}
			if (control?.value.trim().length < min || control?.value.trim().length > max)
				return {
					lengthBetween: msg['lengthBetween']
						.replace('{min}', min.toString())
						.replace('{max}', max.toString()),
				}
			return null
		}
	},
	value: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {value: msg['required']}
			if (isNaN(control?.value) || control?.value !== value)
				return {value: msg['value'].replace('{value}', value.toString())}
			return null
		}
	},
	minValue: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {minValue: msg['required']}
			if (isNaN(control?.value) || Number(control?.value) < value)
				return {minValue: msg['minValue'].replace('{minValue}', value.toString())}
			return null
		}
	},
	maxValue: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {maxValue: msg['required']}
			if (isNaN(control?.value) || Number(control?.value) > value)
				return {maxValue: msg['maxValue'].replace('{maxValue}', value.toString())}
			return null
		}
	},
	valueBetween: (min: number, max: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {valueBetween: msg['required']}
			if (isNaN(control?.value) || Number(control?.value) < min || Number(control?.value) > max)
				return {
					valueBetween: msg['valueBetween'].replace('{min}', min.toString()).replace('{max}', max.toString()),
				}
			return null
		}
	},
	equalsTo: (controlName: string, controlLabel: string | null = null): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value) return {enum: msg['required']}
			const form = control.parent
			const targetControl = form?.get(controlName)
			if (control?.value !== targetControl?.value)
				return {equalsTo: msg['equalsTo'].replace('{equalsTo}', controlLabel || controlName)}
			return null
		}
	},
	enum: (value: any[] = []): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {enum: msg['required']}
			if (!value.includes(control?.value)) return {maxValue: msg['enum'].replace('{enum}', value.toString())}
			return null
		}
	},
	isDate: (control: AbstractControl): ValidationErrors | null => {
		if (!control?.value || !control?.value.trim().length) return {date: msg['required']}
		if (control?.value.trim().length < 8) return {isDate: msg['isDate']}
		const day = control?.value.toString().substring(0, 2)
		const month = control?.value.toString().substring(2, 4)
		const year = control?.value.toString().substring(4, 8)
		const modifiedDate = `${month}/${day}/${year}`
		if (!new Date(modifiedDate).valueOf()) return {isDate: msg['isDate']}
		return null
	},
	date: (value: Date): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {date: msg['required']}
			if (control?.value.trim().length < 8) return {date: msg['date'].replace('{date}', value.toString())}
			const day = control?.value.toString().substring(0, 2)
			const month = control?.value.toString().substring(2, 4)
			const year = control?.value.toString().substring(4, 8)
			const modifiedDate = `${month}/${day}/${year}`
			if (new Date(modifiedDate).valueOf() !== value.valueOf())
				return {date: msg['date'].replace('{date}', value.toString())}
			return null
		}
	},
	minDate: (value: Date): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {minDate: msg['required']}
			if (control?.value.trim().length < 8) return {minDate: msg['date'].replace('{date}', value.toString())}
			const day = control?.value.toString().substring(0, 2)
			const month = control?.value.toString().substring(2, 4)
			const year = control?.value.toString().substring(4, 8)
			const modifiedDate = `${month}/${day}/${year}`
			if (!new Date(modifiedDate).valueOf()) return {minValue: msg['date'].replace('{date}', value.toString())}
			if (new Date(modifiedDate).valueOf() < value.valueOf())
				return {minValue: msg['minDate'].replace('{minDate}', snDate(value).toUser().substring(0, 10))}
			return null
		}
	},
	maxDate: (value: Date): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {maxDate: msg['required']}
			if (control?.value.trim().length < 8) return {maxDate: msg['date'].replace('{date}', value.toString())}
			const day = control?.value.toString().substring(0, 2)
			const month = control?.value.toString().substring(2, 4)
			const year = control?.value.toString().substring(4, 8)
			const modifiedDate = `${month}/${day}/${year}`
			if (!new Date(modifiedDate).valueOf()) return {maxValue: msg['date'].replace('{date}', value.toString())}
			if (new Date(modifiedDate).valueOf() > value.valueOf())
				return {maxValue: msg['maxDate'].replace('{maxDate}', snDate(value).toUser().substring(0, 10))}
			return null
		}
	},
	time: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {time: msg['time']}
			return null
		}
	},
	minTime: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {minTime: msg['minTime']}
			return null
		}
	},
	maxTime: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {maxTime: msg['maxTime']}
			return null
		}
	},
	datetime: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {datetime: msg['datetime']}
			return null
		}
	},
	minDateTime: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {minDateTime: msg['minDateTime']}
			return null
		}
	},
	maxDateTime: (value: number): ValidatorFn => {
		return (control: AbstractControl): ValidationErrors | null => {
			if (!control?.value || !control?.value.trim().length) return {maxDateTime: msg['maxDateTime']}
			return null
		}
	},
}
