import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
	{path: '', loadChildren: () => import('./modules/unlogged/unlogged.module').then((m) => m.UnloggedModule)},
	{path: 'logado', loadChildren: () => import('./modules/logged/logged.module').then((m) => m.LoggedModule)},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Project01RoutingModule {}
