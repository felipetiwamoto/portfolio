import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MainComponent} from './components/main/main.component'
import {LoginComponent} from './pages/login/login.component'
import {RegisterComponent} from './pages/register/register.component'
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component'
import {RedefinePasswordComponent} from './pages/redefine-password/redefine-password.component'
import {EmailValidationComponent} from './pages/email-validation/email-validation.component'

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{path: '', component: LoginComponent},
			{path: 'register', component: RegisterComponent},
			{path: 'forgot-password', component: ForgotPasswordComponent},
			{path: 'redefine-password/:token', component: RedefinePasswordComponent},
			{path: 'email-validation/:token', component: EmailValidationComponent},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UnloggedRoutingModule {}
