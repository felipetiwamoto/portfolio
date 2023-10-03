import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {UnloggedRoutingModule} from './unlogged-routing.module'
import {MainComponent} from './components/main/main.component'
import {LoginComponent} from './pages/login/login.component'
import {RegisterComponent} from './pages/register/register.component'
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component'
import {RedefinePasswordComponent} from './pages/redefine-password/redefine-password.component'
import {EmailValidationComponent} from './pages/email-validation/email-validation.component'
import {SimpleAngularModule} from 'src/app/modules/simple-angular/simple-angular.module'

@NgModule({
	declarations: [
		MainComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		RedefinePasswordComponent,
		EmailValidationComponent,
	],
	imports: [CommonModule, UnloggedRoutingModule, SimpleAngularModule],
})
export class UnloggedModule {}
